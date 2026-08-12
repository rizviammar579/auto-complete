import app from "./app.js";
import { startup } from "./startup.js";
import { automation } from "./functions/automation.js";
import { createNotification } from "./utils/createNotification.js";

await startup();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);

    automation().catch(async (err) => {
        
        console.error(err);

        await createNotification(
            "Unexpected Error",
            "An unexpected error occurred while running automation. Please check the console for more details.",
            "error"
        );
    });


});