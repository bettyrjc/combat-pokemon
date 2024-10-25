import axios from "axios";

export const httpInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});