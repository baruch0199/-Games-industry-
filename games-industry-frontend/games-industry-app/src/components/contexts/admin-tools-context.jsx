import { createContext } from "react";
import { useEffect, useState } from "react";
import {
  getProductsMainSection,
  deleteOneDB,
  deleteProducts,
} from "../../services/main-page-producs-service-tools-for-admin";

const AdiminToolsContext = createContext({
  deleteGame: null,
});
