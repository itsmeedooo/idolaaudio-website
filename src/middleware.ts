import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    const isOAuthRoute = context.url.pathname.includes('/github/oauth/') || context.url.pathname.includes('/github/login');

    if (isOAuthRoute) {
        const forwardedHost = context.request.headers.get('x-forwarded-host') || context.request.headers.get('host');
        const forwardedProto = context.request.headers.get('x-forwarded-proto') || 'https';

        if (forwardedHost) {
            // Rewrite URL to use the correct public domain
            const correctUrl = new URL(context.url);
            correctUrl.protocol = forwardedProto;
            correctUrl.host = forwardedHost;

            // Create new request with corrected URL
            const newRequest = new Request(correctUrl.toString(), {
                method: context.request.method,
                headers: context.request.headers,
                body: context.request.body,
                // @ts-ignore - Required for Astro/Node compatibility
                duplex: 'half'
            });

            // Update context with corrected values
            Object.defineProperty(context, 'url', { value: correctUrl, writable: false });
            Object.defineProperty(context, 'request', { value: newRequest, writable: false });
        }
    }

    return next();
});