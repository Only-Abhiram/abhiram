const logos = [
    {
        "name": "C++",
        "url": "https://tse4.mm.bing.net/th/id/OIP.yHyDKgpZ3HuJSMxYtBA4pAHaHa?pid=Api&P=0&h=180"
    },
    {
        "name": "JavaScript",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    },
    {
        "name": "Java",
        "url": "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
    },
    {
        "name": "Python",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
    },
    {
        "name": "SQL (Postgres)",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
    },
    {
        "name": "NoSQL (MongoDB)",
        "url": "https://tse4.mm.bing.net/th/id/OIP.mwJKYF6LLQ7U0_YKqdCATwHaEo?pid=Api&P=0&h=180"
    },
    {
        "name": "HTML5",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
    },
    {
        "name": "React.js",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
    {
        "name": "Node.js",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
    },
    {
        "name": "Express.js",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
    },
    {
        "name": "Next.js",
        "url": "https://assets.vercel.com/image/upload/q_auto/front/nextjs/next-logo.svg"
    },
    {
        "name": "Tailwind CSS",
        "url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
    },
    {
        "name": "Data Structures and Algorithms",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/84/Algorithm.svg"
    },
    {
        "name": "Postman",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Postman-logo.png"
    },
    {
        "name": "Git & GitHub",
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
    },
    {
        "name": "Chrome DevTools",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
    },
    {
        "name": "VS Code",
        "url": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
    },
    {
        "name": "Cursor",
        "url": "https://cursor.so/assets/images/logo.svg"
    }]
import SkillLogoSpawner from './logospawnner';

export default function Skills() {
    return <>
        <SkillLogoSpawner
            logos={logos}
            columns={4}        // initial column count
            speed={3000}       // ms per flip cycle
            showControls={false} // hide controls if embedding silently
        />

    </>
}