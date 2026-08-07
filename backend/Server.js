import app from "./app.js";
import { automation } from "./automation.js";

await automation();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});