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
    ABOUT = '/about',
    CART = '/cart',
    FAVORITES = '/favorites',

    CATALOG = '/catalog',

    PRODUCT = '/:product/:id', // MODEL

    ARTICLES = '/articles',
    // ARTICLE = `/articles/:id`,

    SIGNIN = '/signin',
    SIGNUP = '/signup',
    ERROR = '/error',
    CATCH_ALL = '*',

    // Protected
    PROFILE = '/profile',
    ADDRESSES = '/addresses',
}
