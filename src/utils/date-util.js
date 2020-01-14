import dayjs from "element-ui/lib/utils/date";

export function dateFormat(date, rule = "yyyy-MM-DD") {
    return date ? dayjs.format(date, rule) : "";
}

export function dateFormatFull(date) {
    return dateFormat(date, "yyyy-MM-DD HH:mm");
}

export function dateFormatToSecond(date) {
    return dateFormat(date, "yyyy-MM-DD HH:mm:ss")
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