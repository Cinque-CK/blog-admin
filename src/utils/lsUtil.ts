export function getToken() : string {
    return localStorage.getItem('blog-admin-token') || '';
}
export function setToken(token : string) : void {
    localStorage.setItem('blog-admin-token', token);
}
export function removeToken() : void {
    localStorage.removeItem('blog-admin-token');
}

export function getArticle() : string {
    return localStorage.getItem('blog-admin-article') || '';
}
export function setArticle(article : string) : void {
    localStorage.setItem('blog-admin-article', article);
}
export function removeArticle() : void {
    localStorage.removeItem('blog-admin-article');
}
