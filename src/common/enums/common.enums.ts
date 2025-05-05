/**
 * Some COMMON enums
 * ToDO: add common enums (HTTP Methods, HTTP Statuses, etc.)
 */

export enum Http_Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum PATH {
    PAGE_ROOT = '/',
    MAIN = '/main',
    CATALOG = '/catalog',
    COLLECTIONS = '/collections',
    ARTICLES = '/articles',
    PRODUCT = '/:product/:id',
    ARTICLE = '/:article/:id',
    PROTECTED = '/protected',
    LOGIN = '/login',
    REGISTER = '/register',
    ERROR = '/error',
}
