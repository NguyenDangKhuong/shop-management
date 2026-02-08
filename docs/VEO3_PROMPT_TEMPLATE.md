# Veo3 Prompt Template — Quảng cáo sản phẩm

Hướng dẫn viết prompt Veo3 video quảng cáo sản phẩm cho TikTok.

---

## Cấu trúc prompt

Mỗi prompt gồm **5 phần** theo thứ tự:

### 1. 🎯 Reference Image Match (BẮT BUỘC)
Luôn mở đầu bằng dòng này để Veo3 giữ đúng hình dạng sản phẩm:

```
The product must match exactly the reference image provided — [MÔ TẢ CHI TIẾT SẢN PHẨM: hình dạng, chất liệu, màu sắc, kích thước tương đối, các chi tiết đặc biệt]
```

> **Mẹo:** Mô tả càng chi tiết càng tốt — hình dáng, vật liệu, màu sắc, bề mặt, phụ kiện đi kèm (remote, dây sạc...).

### 2. 🎬 Thông số kỹ thuật
```
Cinematic 8K [product video / product showcase / advertisement], 8 seconds, [seamless continuous shot / single continuous take / seamless flowing shot].
```

| Thông số | Giá trị |
|----------|---------|
| Độ phân giải | 8K |
| Thời lượng | 8 giây |
| Kiểu quay | Liền mạch, không cắt (continuous shot) |

### 3. 🏠 Bối cảnh & Camera
Mô tả không gian và chuyển động camera:

```
[Mô tả không gian]. Camera [chuyển động: slowly glides / pulls back / drifts in a slow arc]...
```

**Bối cảnh gợi ý:**
- Phòng ngủ buổi tối (bedroom at dusk)
- Bàn làm việc sạch sẽ (clean white desk)
- Góc phòng khách (living room corner)
- Bàn ăn (dining table setup)
- Phòng tắm (bathroom vanity)
- Ngoài trời / ban công (balcony at sunset)

**Camera gợi ý:**
- `slowly glides from a side angle toward...` — dolly vào
- `slowly pulls back to reveal...` — zoom ra
- `drifts in a slow arc around...` — quay vòng cung
- `tracks smoothly from left to right...` — pan ngang

### 4. ✨ Hành động sản phẩm
Mô tả sản phẩm hoạt động — đây là phần quan trọng nhất:

```
[Sản phẩm bật lên / hoạt động / thay đổi trạng thái]. [Mô tả hiệu ứng ánh sáng, chuyển động, thay đổi màu sắc...].
```

**Quy tắc:**
- ❌ Không có người xuất hiện: `No people visible / No humans in frame`
- ✅ Sản phẩm luôn là trung tâm: `The product is always centered and prominent`
- ✅ Shallow depth of field để focus sản phẩm
- ✅ Mô tả chi tiết hiệu ứng sản phẩm tạo ra

### 5. 📝 Text quảng cáo tiếng Việt
Thêm text hiển thị trên video:

```
[Elegant / Stylish] Vietnamese text [fades in / appears] at the bottom [center]: "[NỘI DUNG TIẾNG VIỆT]" in [white / soft white] [serif / sans-serif / modern] font with [subtle glow effect / soft drop shadow / gently animated].
```

**Mẹo viết text:**
- Ngắn gọn, dễ đọc trong 2-3 giây
- Nêu bật USP (điểm bán hàng độc đáo)
- Dùng dấu `·` để ngăn cách các ý

---

## Ví dụ hoàn chỉnh — Đèn hoàng hôn RGB

### Prompt 1 — Phòng ngủ
```
The product must match exactly the reference image provided — a compact black 
sunset projection lamp with a round spherical lens head featuring a rainbow-
reflective iridescent glass surface, mounted on a slim adjustable chrome metal 
stand with a heavy circular matte black base, connected by a black USB cable. 

Cinematic 8K product video, 8 seconds, seamless continuous shot. A modern 
minimalist bedroom at dusk, dimly lit. Camera slowly glides from a side angle 
toward this exact sunset lamp sitting on a wooden nightstand. The lamp powers 
on — a warm golden-orange sunset circle gradually illuminates the wall behind, 
casting a dreamy amber glow across the entire room. The light softly shifts 
from deep orange to warm yellow, creating mesmerizing gradient shadows on the 
white wall. No people visible. Shallow depth of field, the lamp and its 
projected sunset circle are the hero subject. Smooth dolly movement, soft 
ambient lighting, editorial product photography feel. 

Elegant Vietnamese text fades in at the bottom center: "Biến phòng ngủ thành 
hoàng hôn lãng mạn" in a soft white serif font with a subtle glow effect.
```

### Prompt 2 — Remote đổi màu
```
The product must match exactly the reference image provided — a compact black 
sunset projection lamp with a round spherical lens head featuring a rainbow-
reflective iridescent glass surface, mounted on a slim adjustable chrome metal 
stand with a heavy circular matte black base, USB powered. Also featured: a 
flat white rectangular IR remote control with 24 colorful round buttons.

Cinematic 8K product showcase, 8 seconds, single continuous take. Close-up of 
this exact sunset lamp on a clean white desk, its warm orange sunset glow 
projected as a perfect circle on the wall behind. Camera slowly pulls back to 
reveal the remote control lying beside the lamp's base. An invisible hand 
presses the remote — the projected sunset circle smoothly transitions from 
golden amber to deep red, then shifts to cool purple, then vivid blue, each 
color flooding the wall and desk with rich ambient light. No people shown, 
only the remote buttons clicking and colors changing. The lamp remains the 
constant focal point throughout. Ultra-sharp detail on the lamp's reflective 
spherical lens. Smooth cinematic motion, no cuts. 

Stylish Vietnamese caption appears at the bottom: "16 màu · 4 chế độ · Đổi 
màu bằng remote" in clean white sans-serif font, gently animated.
```

### Prompt 3 — Góc decor
```
The product must match exactly the reference image provided — a compact black 
sunset projection lamp with a round spherical lens head featuring a rainbow-
reflective iridescent glass surface, mounted on a slim adjustable chrome metal 
stand with a heavy circular matte black base, powered by USB cable.

Cinematic 8K advertisement, 8 seconds, seamless flowing shot. A cozy living 
room corner at night — this exact sunset lamp stands on a floating shelf next 
to a small potted plant and some books. Camera drifts in a slow arc around 
the setup. The lamp casts a large, perfectly round sunset projection on the 
textured wall — warm peach and coral tones blend beautifully. The projected 
circle slowly shifts to a soft pink-magenta gradient, then transitions to a 
calming teal-green, showcasing the RGB color-changing capability. No humans 
in frame. The lamp with its distinctive round iridescent lens head is always 
centered and prominent. Atmospheric, editorial, premium product video aesthetic. 

Vietnamese text elegantly fades in at the bottom: "Đèn hoàng hôn RGB — Decor 
chill · Chụp ảnh đẹp · Cắm USB là sáng!" in white modern font with soft 
drop shadow.
```

---

## Checklist khi viết prompt mới

- [ ] Có mô tả ref image match ở đầu?
- [ ] Có thông số 8K, 8s, continuous shot?
- [ ] Bối cảnh rõ ràng, phù hợp sản phẩm?
- [ ] Camera movement mô tả cụ thể?
- [ ] Sản phẩm có hành động / hiệu ứng nổi bật?
- [ ] Không có người trong video?
- [ ] Text tiếng Việt ngắn gọn, nêu USP?
- [ ] Mỗi prompt có góc quay / bối cảnh khác nhau?

---

*Tài liệu tạo: 09/02/2026*
