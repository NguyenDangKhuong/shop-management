# CLI Proxy API

Last updated: 2026-03-17

## Overview

CLI Proxy API — reverse proxy gộp nhiều AI provider vào 1 endpoint OpenAI-compatible. Cho phép Antigravity, OpenClaw, n8n, và các tool khác dùng chung 1 API key (`khuong`) truy cập tất cả models.

## Server Info

| Key | Value |
|-----|-------|
| **URL** | https://cli-proxy.khuong.theworkpc.com |
| **API Key** | `khuong` |
| **Docker** | `eceasy/cli-proxy-api:latest` |
| **Port** | 8317 (API), 8085 (management) |
| **Host** | Oracle VPS (`heyyolo-free-vps`) |
| **Backup** | [backup-vps](https://github.com/NguyenDangKhuong/backup-vps) (private) |

## Architecture

```
Antigravity IDE ─┐
OpenClaw        ─┤── API key: "khuong" ──→ CLI Proxy (VPS:8317) ──→ Google OAuth (6 accounts)
n8n             ─┤                                                ──→ OpenAI Codex (2 accounts)
Gemini CLI      ─┘                                                ──→ OpenRouter, Mistral, GitHub...
```

## Providers

| Provider | Auth | Models |
|----------|------|--------|
| **Google OAuth** (6 accounts) | refresh_token | Gemini 2.5 Pro/Flash, 3 Pro, Claude via Gemini |
| **OpenAI Codex** (2 accounts) | OAuth | GPT-5, GPT-5.2 |
| **OpenRouter** | API key | GPT-5.2, Claude Sonnet 4, DeepSeek, Llama 4, Kimi K2 |
| **Vercel AI Gateway** | API key | GPT-5.2, Claude Sonnet 4, Gemini |
| **Mistral** | API key | Large, Medium, Small, Codestral, Devstral |
| **GitHub Models** | PAT | GPT-4.1, o4-mini, Llama 4, DeepSeek R1 |
| **Gemini API Key** | API key | Direct Gemini access |

## Config Files (trên VPS)

| Path | Mô tả |
|------|-------|
| `~/cli-proxy/config.yaml` | Config chính — providers, models, aliases |
| `~/cli-proxy/auths/` | OAuth tokens (6 Gemini + 2 Codex) |
| `~/cli-proxy/logs/` | Error logs |

## Quản lý

```bash
# SSH vào VPS
ssh ubuntu@heyyolo-free-vps

# Status
docker ps --filter name=cli-proxy-api

# Logs
docker logs -f cli-proxy-api

# Restart
docker restart cli-proxy-api

# Update image
docker pull eceasy/cli-proxy-api:latest
docker stop cli-proxy-api && docker rm cli-proxy-api
docker run -d --name cli-proxy-api --restart unless-stopped \
  -p 1455:1455 -p 8085:8085 -p 8317:8317 \
  -p 11451:11451 -p 51121:51121 -p 54545:54545 \
  -v ~/cli-proxy/auths:/root/.cli-proxy-api \
  -v ~/cli-proxy/config.yaml:/CLIProxyAPI/config.yaml \
  -v ~/cli-proxy/logs:/CLIProxyAPI/logs \
  eceasy/cli-proxy-api:latest

# Test
curl -s https://cli-proxy.khuong.theworkpc.com/v1/models \
  -H "Authorization: Bearer khuong" | python3 -m json.tool | head -20
```

## OAuth Model Aliases (Antigravity)

Config `oauth-model-alias` trong `config.yaml` map model names cho Antigravity channel:

| Upstream Model | Alias (hiển thị trong IDE) |
|---------------|---------------------------|
| `rev19-uic3-1p` | `gemini-2.5-computer-use-preview-10-2025` |
| `gemini-3-pro-image` | `gemini-3-pro-image-preview` |
| `gemini-3-pro-high` | `gemini-3-pro-preview` |
| `gemini-3-flash` | `gemini-3-flash-preview` |
| `claude-sonnet-4-5` | `gemini-claude-sonnet-4-5` |
| `claude-sonnet-4-5-thinking` | `gemini-claude-sonnet-4-5-thinking` |
| `claude-opus-4-5-thinking` | `gemini-claude-opus-4-5-thinking` |

## Migration History

- **Trước 17/03/2026:** Chạy trên Ubuntu VM (`khuong-ubuntu-esxi`), proxy qua Cloudflare Tunnel (`cli-proxy.thetaphoa.store`)
- **17/03/2026:** Migrate sang Oracle VPS, Nginx reverse proxy trực tiếp (`cli-proxy.khuong.theworkpc.com`)

## Related

- [ORACLE_VPS.md](./ORACLE_VPS.md) — VPS info
- [UBUNTU_VM.md](./UBUNTU_VM.md) — Ubuntu VM services
- [backup-vps](https://github.com/NguyenDangKhuong/backup-vps) — Private backup repo
