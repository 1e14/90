import {Node} from "1e14";
import {createLeafView, LeafViewIn, LeafViewOut} from "../../view";

export type In = LeafViewIn;

export type Out = LeafViewOut;

export type DomStyleView = Node<In, Out>;

export function createDomStyleView(
  style: string
): DomStyleView {
  return createLeafView(() => "style," + style);
}