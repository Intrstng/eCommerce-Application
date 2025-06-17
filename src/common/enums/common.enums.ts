export enum Http_Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum EnvironmentKeys {
    CTP_PROJECT_KEY = 'VITE_CTP_PROJECT_KEY',
    CTP_CLIENT_ID = 'VITE_CTP_CLIENT_ID',
    CTP_CLIENT_SECRET = 'VITE_CTP_CLIENT_SECRET',
    CTP_AUTH_URL = 'VITE_CTP_AUTH_URL',
    CTP_API_URL = 'VITE_CTP_API_URL',
    CTP_SCOPES = 'VITE_CTP_SCOPES',
}

export enum PATH {
    PAGE_ROOT = '/',
    MAIN = '/main',
    ABOUT = '/about',
    CART = '/cart',

    CATALOG = '/catalog',

    PRODUCT = '/product/:id',

    ARTICLES = '/articles',
    // ARTICLE = `/articles/:id`,
    AUTHOR = '/author',

    SIGNIN = '/signin',
    SIGNUP = '/signup',
    ERROR = '/error',
    CATCH_ALL = '*',

    // Protected routes
    PROFILE = '/profile',
    PROFILE_MAIN = '/profile/personal',

    //Nested routes
    PERSONAL_NESTED = 'personal',
    ADDRESS_NESTED = 'address',
    PASSWORDS_NESTED = 'password',
}

export enum PAGES {
    MAIN = 'Home',
    ABOUT = 'About',
    CART = 'Cart',
    FAVORITES = 'Favorites',
    CATALOG = 'Catalog',
    PRODUCT = 'Product',
    ARTICLE = 'Article',
    ARTICLES = 'Articles',
    SIGNIN = 'Login',
    SIGNUP = 'Registration',
    ERROR = 'Error',
    // Protected pages
    PROFILE = 'Profile',
    ADDRESSES = 'Addresses',
}

export enum CATEGORIES {
    EARRINGS = 'earrings',
    RINGS = 'rings',
    BROOCHES = 'brooches',
    OTHER = 'other',
    PRODUCTS = 'all products',
    ABOUT = 'about us',
    ACCOUNT = 'account',
    LOGIN = 'log in',
    LOGOUT = 'logout',
}

export enum AddressModalType {
    SHIPPING = 'shipping',
    BILLING = 'billing',
}

export enum AddressStatus {
    ON = 'on',
    OFF = 'off',
}
