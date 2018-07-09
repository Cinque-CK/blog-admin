export function getToken(): string {
    return localStorage.getItem('blog-token') || '';
}
export function setToken(token: string): void {
    localStorage.setItem('blog-token', token);
}
export function removeToken(): void {
    localStorage.removeItem('blog-token');
}
