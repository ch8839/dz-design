"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const tokenGenerator = require("../../plop-templates/index");
const gen_token_1 = __importDefault(require("./gen-token"));
function default_1(plop) {
  plop.setGenerator("gen:token", tokenGenerator);
  plop.setActionType("startGenerate", function (answers, config, plop) {
    return __awaiter(this, void 0, void 0, function* () {
      const { fileType } = config;
      (0, gen_token_1.default)(fileType);
    });
  });
}
exports.default = default_1;
//# sourceMappingURL=plopfile.js.map
