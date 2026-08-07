export function formatDueDateTime(dueDate, dueTime) {

    if (!dueDate) {
        return "No due date";
    }

    const utcDate = new Date(Date.UTC(
        dueDate.year ,
        dueDate.month - 1,
        dueDate.day,
        dueTime?.hours ?? 23,
        dueTime?.minutes ?? 59
    ));

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = utcDate.getDate();
    const month = months[utcDate.getMonth()];

    const hours = String(utcDate.getHours()).padStart(2, "0");
    const minutes = String(utcDate.getMinutes()).padStart(2, "0");

    return `Due ${date} ${month}, ${hours}:${minutes}`;

   
}