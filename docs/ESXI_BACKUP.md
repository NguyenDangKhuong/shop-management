# 💾 ESXi Automatic Backup System (ghettoVCB)

Hệ thống tự động sao lưu máy ảo (VM) trên host ESXi (`192.168.1.100`) từ datastore SSD sang HDD Datastore (`HDD Ultrastar` tại `/vmfs/volumes/64b24558-307f68a6-2b65-00e04ca10162/`).

---

## 🛠️ Tổng Quan Công Cụ & Thư Mục

* **Công cụ sử dụng:** [ghettoVCB](https://github.com/lamw/ghettoVCB) - Script sao lưu mã nguồn mở phổ biến và an toàn cho VMware ESXi.
* **Đường dẫn cài đặt:** `/vmfs/volumes/SSD/ghettoVCB/`
* **Đường dẫn cấu hình chính:** `/vmfs/volumes/SSD/ghettoVCB/ghettoVCB.conf`
* **Thư mục cấu hình riêng cho từng VM:** `/vmfs/volumes/SSD/ghettoVCB/vm_configs/`
* **Thư mục đích chứa Backup (HDD):** `/vmfs/volumes/64b24558-307f68a6-2b65-00e04ca10162/VM Installed/`

---

## ⚙️ Cấu Hình ghettoVCB (`ghettoVCB.conf`)

Cấu hình được thiết lập để tối ưu dung lượng và bảo vệ máy chủ:
* **Ghi đè bản cũ:** Giữ lại chính xác **1** bản backup mới nhất (`VM_BACKUP_ROTATION_COUNT=1`). Khi có backup mới thành công, script sẽ tự động xóa bản cũ đi để giải phóng dung lượng.
* **Định dạng Thin Provisioning:** Sử dụng `vmkfstools -i` để clone đĩa ảo dưới dạng **thin-provisioned** (`DISK_BACKUP_FORMAT=thin`). Ổ cứng ảo 80GB nhưng chỉ dùng thực tế 5GB thì bản backup chỉ nặng đúng 5GB.
* **Backup nóng (Hot Backup):** Không cần tắt máy ảo khi backup (`POWER_VM_DOWN_BEFORE_BACKUP=0`). Script tự động tạo snapshot tạm thời để copy đĩa ảo, sau đó xoá snapshot để tránh phân mảnh đĩa.

---

## 🚫 Cấu Hình Loại Trừ Ổ Đĩa (Ví dụ: Xpenology)

Với các máy ảo có ổ cứng dữ liệu quá lớn (như NAS 2 TB trên HDD), việc backup đĩa dữ liệu này ngược lại HDD là không cần thiết và tốn thời gian. 

Chúng ta chỉ định cấu hình riêng tại file `/vmfs/volumes/SSD/ghettoVCB/vm_configs/Xpenology`:
```bash
VMDK_FILES_TO_BACKUP="Xpenology.vmdk,Liu.vmdk"
```
* **Kết quả:** Script chỉ backup ổ cứng OS hệ thống (`Xpenology.vmdk` 16GB và `Liu.vmdk` 1GB) nằm trên SSD, bỏ qua hoàn toàn ổ đĩa lưu trữ `Xpenology_1.vmdk` (2TB).

---

## 🧹 Tự Động Dọn Dẹp Bản Backup Của Máy Ảo Đã Xoá (`cleanup-deleted-vms.sh`)

Khi một máy ảo bị xoá khỏi ESXi, ghettoVCB sẽ không quản lý và không tự động xoá các bản backup cũ của máy ảo đó nữa. 

Script `/vmfs/volumes/SSD/ghettoVCB/cleanup-deleted-vms.sh` được viết để giải quyết việc này:
* **Cơ chế:** Quét tất cả các thư mục backup trên HDD, đối chiếu với danh sách các máy ảo đang đăng ký trên ESXi (`vim-cmd vmsvc/getallvms`).
* **Thời gian hết hạn:** Nếu máy ảo đó không còn tồn tại trên ESXi, các bản backup cũ của nó sẽ bị xoá sau **90 ngày** (3 tháng). Khi không còn bản backup nào, thư mục của máy ảo đó trên HDD cũng sẽ bị dọn dẹp sạch sẽ.

---

## 📅 Lịch Chạy Tự Động (Cronjob) & Cơ Chế Persistence

ESXi sẽ xoá sạch cấu hình crontab mỗi khi khởi động lại. Do đó lịch chạy được lưu trữ trong `/etc/rc.local.d/local.sh` để tự động nạp lại mỗi khi boot:

### File `/etc/rc.local.d/local.sh` (trên ESXi Host):
```bash
# Auto-inject ghettoVCB cronjob on boot
echo "0 2 * * 0 /vmfs/volumes/SSD/ghettoVCB/ghettoVCB.sh -a -g /vmfs/volumes/SSD/ghettoVCB/ghettoVCB.conf -c /vmfs/volumes/SSD/ghettoVCB/vm_configs > /vmfs/volumes/SSD/ghettoVCB/backup.log 2>&1" >> /var/spool/cron/crontabs/root
echo "30 2 * * 0 /vmfs/volumes/SSD/ghettoVCB/cleanup-deleted-vms.sh >> /vmfs/volumes/SSD/ghettoVCB/cleanup.log 2>&1" >> /var/spool/cron/crontabs/root
kill $(cat /var/run/crond.pid)
crond
```

### Chi tiết lịch chạy:
1. **02h00 sáng Chủ Nhật hàng tuần:** Chạy script backup toàn bộ máy ảo (`ghettoVCB.sh`). Log lưu tại `/vmfs/volumes/SSD/ghettoVCB/backup.log`.
2. **02h30 sáng Chủ Nhật hàng tuần:** Chạy script dọn dẹp các máy ảo đã xoá (`cleanup-deleted-vms.sh`). Log lưu tại `/vmfs/volumes/SSD/ghettoVCB/cleanup.log`.

*(Sau khi sửa đổi `local.sh`, đã chạy lệnh `/sbin/auto-backup.sh` để đồng bộ cấu hình vào phân vùng khởi động).*

---

## 💻 Hướng Dẫn Chạy Thủ Công & Khôi Phục (Restore)

### Chạy backup thủ công tất cả máy ảo:
```bash
/vmfs/volumes/SSD/ghettoVCB/ghettoVCB.sh -a -g /vmfs/volumes/SSD/ghettoVCB/ghettoVCB.conf -c /vmfs/volumes/SSD/ghettoVCB/vm_configs
```

### Chạy backup thủ công một máy ảo cụ thể (Ví dụ: `alpine-cloudflared`):
```bash
/vmfs/volumes/SSD/ghettoVCB/ghettoVCB.sh -m alpine-cloudflared -g /vmfs/volumes/SSD/ghettoVCB/ghettoVCB.conf -c /vmfs/volumes/SSD/ghettoVCB/vm_configs
```

### Cách Restore máy ảo khi SSD gặp sự cố:
1. Copy thư mục máy ảo mong muốn (ví dụ: `Ubuntu22.04`) từ HDD datastore sang SSD datastore (qua giao diện Web ESXi hoặc lệnh `cp -r` / `vmkfstools`).
2. Mở ESXi Web UI, click **Create/Register VM**.
3. Chọn **Register an existing virtual machine** (Đăng ký máy ảo hiện có).
4. Nhấn **Browse** và chọn file cấu hình máy ảo `.vmx` (ví dụ: `Ubuntu22.04/Ubuntu22.04-YYYY-MM-DD_HH-MM-SS/Ubuntu22.04.vmx`).
5. Hoàn thành đăng ký và nhấn **Power On** để khởi động lại máy ảo.
