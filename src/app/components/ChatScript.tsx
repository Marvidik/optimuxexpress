"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ChatScript() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname || pathname.startsWith("/eshipcont")) {
            return;
        }

        if (document.getElementById("smartsupp-script")) {
            return;
        }

        const script = document.createElement("script");
        script.id = "smartsupp-script";
        script.type = "text/javascript";

        script.innerHTML = `
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'bb7cbc2f0a041344dcc4cafdbb0dd40db60226ba';
            window.smartsupp || (function(d) {
                var s, c, o = smartsupp = function() { o._.push(arguments); };
                o._ = [];
                s = d.getElementsByTagName('script')[0];
                c = d.createElement('script');
                c.type = 'text/javascript';
                c.charset = 'utf-8';
                c.async = true;
                c.src = 'https://www.smartsuppchat.com/loader.js?';
                s.parentNode.insertBefore(c, s);
            })(document);
        `;

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [pathname]);

    return null;
}