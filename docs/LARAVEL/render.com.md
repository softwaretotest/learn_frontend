# render.com

## ⚠️ Important Limitations of Render.com Hobby Plan (0฿/month)

While the Hobby tier allows you to deploy both your Monolith Web Service and PostgreSQL for free, it comes with specific constraints that affect live E-commerce stores.

---

## 📦 1. Web Service Limitation: The "Sleep" Mode (Spin Down)

If you deploy your Laravel + React Monolith on the Free/Hobby instance, Render enforces an inactivity rule:

- **The Rule:** If no one visits your website for **15 consecutive minutes**, your Web Service will automatically go to "sleep" (Spin Down).
- **The Impact on Customers:** The next customer who visits your shop will experience a **delay of 30 to 60 seconds** (Cold Start) while the server wakes up. After it wakes up, the site runs at normal speed.
- **The Risk:** Customers might think your website is broken and close the page before it loads.

---

## 💾 2. PostgreSQL Limitation: The "30-Day Expiration" Rule

This is the most critical constraint for an E-commerce application on Render's free tier.

- **The Rule:** Free PostgreSQL databases **expire and stop working exactly 30 days after creation**.
- **The Impact on Your Shop:** After 30 days, your database becomes inaccessible. You will have a **14-day grace period** to upgrade it to a paid tier (Starter plan costs around $7/month). If you do not upgrade within the grace period, **Render will permanently delete the database and all its data** (including your products, orders, and user accounts).

---

## 🎯 Summary & Strategy for Your E-commerce Shop

- **During Development:** The **Hobby plan (0฿)** is 100% perfect. Use it to build your shop, test the login system, and practice adding products without spending money.
- **When Launching to Real Customers:**
    1. Keep your Monolith app on the Free tier if you are okay with the 60-second wake-up delay for the first visitor.
    2. **You MUST upgrade the PostgreSQL database** to the lowest paid tier (approx. 200-250 THB/month) before the 30-day mark. Otherwise, you will lose your real customer orders and store data completely.
