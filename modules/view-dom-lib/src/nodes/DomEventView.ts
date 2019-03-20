import {Flame, replacePathTail} from "gravel-core";
import {LeafViewIn, LeafViewOut} from "gravel-view";
import {createNode, Node} from "river-core";
import {DomEventType} from "../types";

export type In = LeafViewIn;

export type Out = LeafViewOut & {
  d_event: Flame;
};

// TODO: Re-introduce event type?
//  (Requires generic Flame)
export type DomEventView = Node<In, Out>;

/**
 * On VM, adds / removes a callback which wraps the affected VM path into a
 * Flame.
 * @param type
 */
export function createDomEventView<T extends Event>(
  type: DomEventType
): DomEventView {
  return createNode<In, Out>(["d_event", "d_view"], (outputs) => ({
    d_vm: (value, tag) => {
      const set = {};
      const vmSet = value.set;
      const del = value.del;
      for (const path in vmSet) {
        set[replacePathTail(path, () => type)] = (event) => {
          event.stopImmediatePropagation();
          // TODO: Timestamp event tag?
          outputs.d_event({
            [path]: event
          }, tag);
          return;
        };
      }
      outputs.d_view({set, del}, tag);
    }
  }));
}
