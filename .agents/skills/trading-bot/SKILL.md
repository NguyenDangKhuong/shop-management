---
name: trading-bot
description: Crypto trading bot development. Binance Futures API, technical indicators, strategy patterns, risk management, Telegram integration. Use when building or debugging trading bots.
---

# Trading Bot Development Skill

## 1. Binance Futures API

### Authentication
```js
// HMAC SHA256 signature required for all private endpoints
const crypto = require('crypto')
const sign = (params, secret) => {
  const query = new URLSearchParams(params).toString()
  return crypto.createHmac('sha256', secret).update(query).digest('hex')
}

// Testnet: https://testnet.binancefuture.com
// Live:    https://fapi.binance.com
```

### Key Endpoints
```
POST /fapi/v1/order          — Place order
DELETE /fapi/v1/order        — Cancel order
GET  /fapi/v2/account        — Account info (balance, positions)
GET  /fapi/v2/positionRisk   — Current positions
POST /fapi/v1/leverage       — Set leverage
POST /fapi/v1/marginType     — Set margin type (ISOLATED/CROSSED)
GET  /fapi/v1/klines         — Candlestick data
```

### Order Types
```js
// Market order (execute immediately)
{ symbol: 'BTCUSDT', side: 'BUY', type: 'MARKET', quantity: 0.001 }

// Limit order (execute at price)
{ symbol: 'BTCUSDT', side: 'BUY', type: 'LIMIT', price: 65000, quantity: 0.001, timeInForce: 'GTC' }

// Stop-loss
{ symbol: 'BTCUSDT', side: 'SELL', type: 'STOP_MARKET', stopPrice: 64000, closePosition: true }

// Take-profit
{ symbol: 'BTCUSDT', side: 'SELL', type: 'TAKE_PROFIT_MARKET', stopPrice: 68000, closePosition: true }
```

### WebSocket Streams
```js
// Kline/Candlestick stream (real-time price)
wss://fstream.binance.com/ws/btcusdt@kline_15m

// User data stream (order updates, position changes)
// 1. POST /fapi/v1/listenKey → get listenKey
// 2. Connect: wss://fstream.binance.com/ws/<listenKey>
// 3. PUT /fapi/v1/listenKey every 30 min to keepalive
```

### Rate Limits
- Orders: 1200/min (weight-based)
- WebSocket: 5 messages/sec per connection
- Klines: max 1500 candles per request
- Always check `X-MBX-USED-WEIGHT` header

### Common Pitfalls
- **Quantity precision**: BTC min qty = 0.001, step = 0.001. Use `stepSize` from exchangeInfo
- **Price precision**: Must match `tickSize`. Round to correct decimals
- **Margin**: ISOLATED safer than CROSSED for beginners
- **Testnet vs Live**: Different API keys, different base URLs
- **Timestamp**: Must be within 1000ms of server time. Sync with `GET /fapi/v1/time`

## 2. Technical Indicators

### RSI (Relative Strength Index)
```
Period: 14 (standard)
Oversold: < 30 (buy signal)
Overbought: > 70 (sell signal)

Calculation:
  RS = avg_gain(14) / avg_loss(14)
  RSI = 100 - (100 / (1 + RS))

Best for: Reversal detection, divergence
Weakness: False signals in strong trends
```

### EMA (Exponential Moving Average)
```
Fast: EMA 9 (short-term trend)
Slow: EMA 21 (medium-term trend)

Crossover signals:
  EMA9 > EMA21 → Bullish (buy)
  EMA9 < EMA21 → Bearish (sell)

Best for: Trend direction, entry timing
Weakness: Lags in choppy/sideways markets
```

### MACD
```
MACD Line = EMA(12) - EMA(26)
Signal Line = EMA(9) of MACD Line
Histogram = MACD - Signal

Buy: MACD crosses above Signal + histogram positive
Sell: MACD crosses below Signal + histogram negative
```

### Bollinger Bands
```
Middle = SMA(20)
Upper = SMA(20) + 2 * StdDev(20)
Lower = SMA(20) - 2 * StdDev(20)

Buy: Price touches Lower Band + RSI < 30
Sell: Price touches Upper Band + RSI > 70
Squeeze: Bands narrow → big move coming
```

## 3. Strategy Patterns

### RSI + EMA Crossover (Recommended for beginners)
```
LONG:  EMA9 > EMA21 AND RSI crosses above 35
SHORT: EMA9 < EMA21 AND RSI crosses below 65
EXIT:  SL -2% | TP +4% | Trailing stop after +2%

Timeframe: 15m
Win rate: ~55-60% on BTC
Risk:Reward: 1:2
```

### Grid Trading
```
Set price range: $60,000 - $70,000
Grid levels: 10
Each grid: buy low, sell high within range
Profit: spread between grids

Best for: Sideways/ranging markets
Risk: Loses money in strong trends breaking range
```

### DCA (Dollar Cost Average)
```
Buy $X every N hours regardless of price
Reduces average entry price over time

Best for: Long-term accumulation
Not suitable for: Futures (funding fees eat profits)
```

### Scalping with Volume
```
LONG:  Volume spike >2x avg AND price breaks above VWAP
SHORT: Volume spike >2x avg AND price breaks below VWAP
EXIT:  Quick TP +0.5-1% | SL -0.3%

Timeframe: 1m-5m
Frequency: 10-30 trades/day
Risk: High fees, need low latency
```

## 4. Risk Management Rules

### Position Sizing
```
Never risk more than 1-2% of account per trade
Position size = (Account * Risk%) / (Entry - StopLoss)

Example ($10 account, 2% risk, 3x leverage):
  Risk per trade = $10 * 2% = $0.20
  If SL = 2% from entry → Position = $0.20 / 0.02 = $10
  With 3x leverage → Margin needed = $10 / 3 = $3.33
```

### Mandatory Rules
```
1. ALWAYS set stop-loss — no exceptions
2. Never move stop-loss further from entry
3. Max daily loss = 20% → bot stops for 24h
4. Max consecutive losses = 5 → cooldown 1h
5. Max open positions = 1 (for $10 account)
6. Trailing stop: move SL to breakeven when profit > 1x risk
7. Never increase position size after losses (no martingale)
```

### Leverage Guidelines
```
$10-50:    Max 3-5x
$50-500:   Max 2-3x
$500+:     Max 1-2x

Higher leverage = higher liquidation risk
$10 at 3x = liquidated at ~33% move against you
$10 at 10x = liquidated at ~10% move against you
```

## 5. Telegram Bot Patterns

### Command Handler Structure
```js
bot.onText(/\/start/, (msg) => { /* enable trading */ })
bot.onText(/\/stop/, (msg) => { /* disable trading */ })
bot.onText(/\/buy (\d+)/, (msg, match) => { /* manual LONG */ })
bot.onText(/\/status/, (msg) => { /* show balance + position */ })

// Restrict to owner only
const OWNER_ID = process.env.TELEGRAM_OWNER_ID
const isOwner = (msg) => String(msg.from.id) === OWNER_ID
```

### Notification Format
```
Entry:  🟢 LONG BTC @ $67,234 | Size: $30 (3x) | SL: -2% | TP: +4%
Exit:   🔴 CLOSED +$1.18 (+3.9%) | Balance: $11.18
Alert:  ⚠️ Daily loss -15% | Bot pausing...
Status: 📊 Balance: $11.18 | Open: LONG BTC +1.2% | Today: +$0.58
```

## 6. Testing & Deployment

### Testnet First (MANDATORY)
```
1. Use Binance Futures Testnet API keys
2. Run minimum 50 trades before going live
3. Track: win rate, avg P&L, max drawdown, Sharpe ratio
4. Only go live if: win rate > 50% AND total P&L positive
```

### Docker Deployment
```yaml
# docker-compose.yml
services:
  trading-bot:
    build: .
    restart: unless-stopped
    env_file: .env
    volumes:
      - ./data:/app/data  # SQLite DB persistence
```

### Monitoring Checklist
```
□ Bot heartbeat every 5 min (Telegram ping)
□ WebSocket reconnect on disconnect
□ API error retry with exponential backoff
□ Graceful shutdown (close positions option)
□ Daily P&L report at midnight
□ Weekly performance summary
```

## 7. Common Mistakes

| Mistake | Why Bad | Fix |
|---|---|---|
| No stop-loss | One bad trade = account blown | Always SL |
| Over-leveraging | Liquidated fast | Max 3-5x for small accounts |
| Trading all pairs | Spread thin, bad signals | Focus BTC only |
| No cooldown after loss | Revenge trading, emotional | 15min cooldown |
| Ignoring fees | 0.04% per trade adds up | Factor fees into TP |
| No testnet phase | Real money lost to bugs | Test 50+ trades first |
| Curve-fitting backtest | Works on past, fails live | Use walk-forward testing |
