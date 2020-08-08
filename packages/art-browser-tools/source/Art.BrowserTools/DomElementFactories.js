"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "createObjectTreeFactories",
      "mergeInto",
      "setDomElementProps",
      "setDomElementChildren"
    ],
    [global, require("./StandardImport"), require("./Dom")],
    (
      createObjectTreeFactories,
      mergeInto,
      setDomElementProps,
      setDomElementChildren
    ) => {
      let Node, document, DomElementFactories, temp;
      temp = global;
      Node = temp.Node;
      document = temp.document;
      return (DomElementFactories = Caf.defClass(
        class DomElementFactories extends Object {},
        function(DomElementFactories, classSuper, instanceSuper) {
          this.createDomElementFactories = (...list) =>
            createObjectTreeFactories(
              {
                mergePropsInto: (intoArray, source) =>
                  Caf.each2(
                    source,
                    (v, k) =>
                      (intoArray[k] =
                        k === "style" ? mergeInto(intoArray[k], v) : v)
                  )
              },
              list,
              (nodeName, props, children) => {
                let element;
                element = document.createElement(nodeName);
                if (props != null) {
                  setDomElementProps(element, props);
                }
                if (children != null) {
                  setDomElementChildren(element, children);
                }
                return element;
              }
            );
          this.allDomElementNames =
            "A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption Figure Font Footer Form Frame FrameSet H1 H2 H3 H4 H5 H6 Head Header Hr Html I IFrame Img Input Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav NoFrames NoScript Object Ol OptGroup Option Output P Param Pre Progress Q Rp Rt Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul Var Video Wbr";
          Caf.object(
            this.createDomElementFactories(this.allDomElementNames),
            null,
            null,
            this
          );
        }
      ));
    }
  );
});
