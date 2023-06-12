import { registerAs } from "@nestjs/config";

export default registerAs('default', () => ({
    service: process.env.SERVICE,
    obj: {
        type: process.env.TYPE,
        key: process.env.KEY,
    },
    port: process.env.PORT || 3000
}));