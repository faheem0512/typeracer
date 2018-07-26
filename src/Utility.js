export function removeHtmlTags(htmlString="") {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex,"");
}