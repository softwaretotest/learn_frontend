import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs";
const OUTPUT = "./src/data/dashboard.json";

function cleanName(name) {
    // 0_IDEA_WEB -> IDEA_WEB
    // 10_LARAVEL -> LARAVEL
    return name.replace(/^\d+_/, "");
}

function cleanLabel(label) {
    return cleanName(label).replaceAll("_", " ").replaceAll("-", " ");
}

function isMarkdown(file) {
    return file.endsWith(".md") || file.endsWith(".mdx");
}

function getSlug(folder, file) {
    const cleanFolder = cleanName(folder);

    return `/docs/${cleanFolder}/${file}`
        .replace(/\.mdx?$/, "")
        .replace(/\\/g, "/");
}

function getCategorySlug(childPath) {
    const categoryFile = path.join(childPath, "_category_.json");

    if (!fs.existsSync(categoryFile)) {
        return "";
    }

    const category = JSON.parse(fs.readFileSync(categoryFile, "utf8"));

    // ใช้ slug ที่กำหนดเองก่อน
    if (category.link?.slug) {
        return "/docs" + category.link.slug;
    }

    // fallback ตาม convention ของ Docusaurus
    if (category.link?.type === "generated-index" && category.label) {
        const slug = category.label.toLowerCase().replace(/\s+/g, "-");

        return `/docs/category/${slug}`;
    }

    return "";
}

function scanFolder(folderName) {
    const folderPath = path.join(DOCS_DIR, folderName);

    const result = {
        id: folderName,
        label: cleanLabel(folderName),
        slug: "",
        children: [],
    };

    const entries = fs.readdirSync(folderPath, {
        withFileTypes: true,
    });

    // parent markdown
    const markdownFiles = entries
        .filter((e) => e.isFile() && isMarkdown(e.name))
        .map((e) => e.name)
        .sort();

    if (markdownFiles.length > 0) {
        result.slug = getSlug(folderName, markdownFiles[0]);
    }

    // child folders
    const childFolders = entries
        .filter((e) => e.isDirectory() && !e.name.startsWith("."))
        .sort((a, b) => a.name.localeCompare(b.name));

    result.children = childFolders.map((child) => {
        const childPath = path.join(folderPath, child.name);

        const files = fs.readdirSync(childPath).filter(isMarkdown).sort();

        let slug = getCategorySlug(childPath);

        // fallback ไปที่ md แรก
        if (!slug && files.length > 0) {
            slug = getSlug(`${folderName}/${child.name}`, files[0]);
        }

        return {
            id: child.name,
            label: cleanLabel(child.name),
            slug,
        };
    });

    return result;
}

const folders = fs
    .readdirSync(DOCS_DIR, {
        withFileTypes: true,
    })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));

const dashboard = folders.map(scanFolder);

fs.mkdirSync("./src/data", {
    recursive: true,
});

fs.writeFileSync(OUTPUT, JSON.stringify(dashboard, null, 2));

console.log("dashboard generated");
