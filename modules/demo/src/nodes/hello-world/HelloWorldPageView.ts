import {connect, Node} from "1e14";
import {createDomTextView} from "gravel-view-dom-lib";
import {
  createFlameDiffSplitter,
  createParentView,
  ParentViewIn,
  ParentViewOut
} from "ninety";

export type In = ParentViewIn;

export type Out = ParentViewOut;

export type HelloWorldPageView = Node<In, Out>;

export function createHelloWorldPageView(
  path: string,
  depth: number = 0
): HelloWorldPageView {
  const view = createParentView(() => path, depth);
  const textView = createDomTextView(() => "childNodes.0:span", depth + 1);
  const splitter = createFlameDiffSplitter<"d_caption">({
    d_caption: ["caption"]
  }, depth + 1);

  connect(view.o.d_vm, splitter.i.d_diff);
  connect(splitter.o.d_caption, textView.i.d_vm);
  connect(textView.o.d_view, view.i.d_view);

  return view;
}
