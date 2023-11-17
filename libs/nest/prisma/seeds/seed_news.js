"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNews = void 0;
var client_1 = require("@prisma/client");
var uuid_1 = require("uuid");
var prisma = new client_1.PrismaClient();
// Add new form_definition row data to the seeds array
var seeds = [
    {
        id: (0, uuid_1.v4)(),
        title: 'Carbon credit market confidence ebbs as big names retreat',
        url: 'https://www.reuters.com/sustainability/carbon-credit-market-confidence-ebbs-big-names-retreat-2023-09-01/',
        image_url: 'https://www.reuters.com/resizer/19ZnOlXJL0lqbq588RsYF5Z-cAM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/6ELBCZRUIRK7FNNQCF66P47QIA.jpg',
        published_at: '2023-09-01T09:00:08.000Z',
        source_name: 'Reuters',
    },
    {
        id: (0, uuid_1.v4)(),
        title: 'Save the Planet, Put Down that Hamburger',
        url: 'https://www.nytimes.com/2023/07/21/climate/diet-vegan-meat-emissions.html',
        image_url: 'https://static01.nyt.com/images/2023/07/21/science/21CLI-VEGAN/21CLI-VEGAN-facebookJumbo.jpg',
        published_at: '2023-07-21T09:00:08.000Z',
        source_name: 'New York Times',
    },
];
function seedNews() {
    return __awaiter(this, void 0, void 0, function () {
        var count;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.$connect()];
                case 1:
                    _a.sent();
                    console.log("Seeding News...");
                    count = 0;
                    return [4 /*yield*/, Promise.all(seeds.map(function (seed) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.news.upsert({
                                            where: {
                                                id: seed.id,
                                            },
                                            update: seed,
                                            create: __assign(__assign({}, seed), { created_at: new Date() }),
                                        })];
                                    case 1:
                                        result = _a.sent();
                                        count++;
                                        console.log("\uD83C\uDF31 seeded (".concat(count, " of ").concat(seeds.length, ") News stories: ").concat(seed.title, " \uD83C\uDF31"), result);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    console.log("".concat(count, " News stories seeded!"));
                    return [4 /*yield*/, prisma.$disconnect()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seedNews = seedNews;
