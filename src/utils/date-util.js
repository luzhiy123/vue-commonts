import dayjs from "dayjs";

export function dateFormat(date, rule = "YYYY-MM-DD") {
    return date ? dayjs(date).format(rule) : "";
}

export function dateFormatFull(date) {
    return dateFormat(date, "YYYY-MM-DD HH:mm");
}

export function dateFormatToSecond(date) {
    return dateFormat(date, "YYYY-MM-DD HH:mm:ss")
}

export function getLimtCurTime(time, type = "time") {
    const curTime = new Date;
    let targetTime
    if (type === "time") {
        targetTime = new Date;
        const [h, m, s] = time.split(":");
        targetTime.setHours(h, m, s);
    } else if (type === "date") {
        targetTime = new Date(time);
    }
    return parseInt((targetTime.getTime() - curTime.getTime()) / 1000);
}

export default dayjs;