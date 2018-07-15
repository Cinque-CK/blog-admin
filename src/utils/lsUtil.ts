export function getToken() : string {
    return localStorage.getItem('blog-token') || '';
}
export function setToken(token : string) : void {
    localStorage.setItem('blog-token', token);
}
export function removeToken() : void {
    localStorage.removeItem('blog-token');
}

export function getArticle() : string {
    return localStorage.getItem('blog-article') || '';
}
export function setArticle(article : string) : void {
    localStorage.setItem('blog-article', article);
}
export function removeArticle() : void {
    localStorage.removeItem('blog-article');
}
