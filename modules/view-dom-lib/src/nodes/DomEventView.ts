import {FlameDiff, prefixDiffPaths} from "gravel-core";
import {createNode, Node} from "river-core";
import {DomEventType} from "../types";

export type In = {
  ev_smp: any;
};

export type Out<T extends Event> = {
  d_event: T;
  v_diff: FlameDiff
};

export type DomEventView<T extends Event> = Node<In, Out<T>>;

export function createDomEventView<T extends Event>(
  prefix: string,
  type: DomEventType
): DomEventView<T> {
  return createNode<In, Out<T>>
  (["v_diff", "d_event"], (outputs) => {
    return {
      ev_smp: (value, tag) => {
        outputs.v_diff(prefixDiffPaths({
          del: {},
          set: {
            [type]: (event) => {
              event.stopImmediatePropagation();
              outputs.d_event(event, tag);
            }
          }
        }, prefix), tag);
      }
    };
  });
}
