import Link from "@docusaurus/Link";
import dashboard from "@site/src/data/dashboard.json";
import styles from "./styles.module.css";
import { useHistory } from "@docusaurus/router";
import Prism from "prismjs";
const COLORS = [
    "#E57373", // Red
    "#64B5F6", // Blue
    "#81C784", // Green
    "#FFD54F", // Yellow
    "#9575CD", // Purple
    "#4DB6AC", // Teal
    "#FF8A65", // Deep Orange
    "#4FC3F7", // Cyan
    "#AED581", // Lime
    "#F06292", // Pink
    "#7986CB", // Indigo
    "#A1887F", // Brown
    "#26A69A", // Teal Dark
    "#BA68C8", // Purple Light
    "#FFB74D", // Orange
    "#90A4AE", // Blue Grey
    "#66BB6A", // Green Dark
    "#29B6F6", // Sky Blue
    "#D4E157", // Lime Bright
    "#AB47BC", // Purple Strong
    "#EF5350", // Red Strong
    "#26C6DA", // Cyan Strong
    "#8D6E63", // Brown Strong
    "#5C6BC0", // Indigo Strong
];

export default function Dashboard() {
    const history = useHistory();

    return (
        <section className={styles.container}>
            <div className={styles.grid}>
                {dashboard.map((item, index) => {
                    const color = COLORS[index % COLORS.length];
                    const hasChildren = item.children.length > 0;

                    return (
                        <div
                            key={item.id}
                            className={styles.link}
                            onClick={() => history.push(item.slug)}
                        >
                            <div
                                className={styles.card}
                                style={{ backgroundColor: color }}
                            >
                                <h2>{item.label}</h2>

                                {hasChildren && (
                                    <div className={styles.children}>
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                to={child.slug}
                                                className={styles.childButton}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.open}>Open →</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
