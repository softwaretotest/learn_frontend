# CMD

## install Mermaid

```json
themes: ["@docusaurus/theme-live-codeblock", "@docusaurus/theme-mermaid"],
// ... (ส่วนอื่นๆ ของ config)

  themeConfig: {
     // (โค้ด navbar, footer, prism ของคุณอยู่ที่นี่)
     // ลบ markdown: { mermaid: true } ออกจากตรงนี้!
  },

  // ย้ายมาวางตรงนี้ครับ (อยู่ในระดับเดียวกับ themeConfig)
  markdown: {
    mermaid: true,
  },
};

```

```bash
npm install --save @docusaurus/theme-mermaid

rm -rf .docusaurus
npm run start
```
