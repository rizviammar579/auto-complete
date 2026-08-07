import app from "./app.js";
import { startup } from "./startup.js";

await startup();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});