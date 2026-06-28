export function getAssignmentDeadline(assignment) {

    let dueDate = assignment.dueDate
    let dueTime = assignment.dueTime

    if (dueDate === null) return null

    return new Date(Date.UTC(
        dueDate.year,
        dueDate.month - 1,
        dueDate.day,
        dueTime?.hours ?? 23,
        dueTime?.minutes ?? 59,
        dueTime?.seconds ?? 0
    ));

}