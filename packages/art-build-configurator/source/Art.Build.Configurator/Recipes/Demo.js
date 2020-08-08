"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge"],
    [global, require("../StandardImport")],
    deepMerge => {
      let Demo;
      return (Demo = Caf.defClass(
        class Demo extends require("../Recipe") {},
        function(Demo, classSuper, instanceSuper) {
          this.description = "A demo ArtSuiteJS app (base: app)";
          this.getter({
            files: function() {
              return deepMerge(this.recipe(require("./App")), {
                source: {
                  [this.namespaceDirPath]: {
                    "StandardImport.caf": "&ArtSuite/Node",
                    _Client: {
                      "Main.caf": `import &StandardImport\n&Models\n&Pipelines\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                        this.packageDotName
                      )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement &Components/App()`,
                      Components: {
                        "User.caf":
                          'import &StandardImport\n\nclass User extends FluxComponent\n\n  delete: ->\n    pipelines.user.delete @props.user?.id\n    .then -> @models.allUsers.reload ""\n\n  render: ->\n    Element\n      :parentWidthChildrenHeight\n      animators: size: toFrom: h: 0\n      :clip\n      Element\n        :parentWidthChildrenHeight\n        :row :childrenCenterLeft\n        childrenMargins: 10\n        TextElement\n          &TextStyles.text\n          :parentWidthChildrenHeight\n          text:       @props.user?.name\n        &Button\n          text: :delete\n          action: @delete',
                        "Users.caf":
                          'import &StandardImport\n\nclass Users extends FluxComponent\n  @subscriptions\n    allUsers: ""\n    :viewState.descending\n\n  render: ->\n    ScrollElement\n      clip: true\n      childrenMargins: 10\n      array user from @allUsers?.sort\n          if @descending\n            (a, b) -> a.name.localeCompare b.name\n          else\n            (a, b) -> b.name.localeCompare a.name\n        &User {} user, key: user.id',
                        "App.caf": `import &StandardImport\n\nclass App extends FluxComponent\n  @subscriptions :viewState.descending\n\n  addUser: ->\n    @models.user.create data: name: randomElement []\n      :Craig   :David   :Elle      :Frank,\n      :Greg    :Hank    :Ian       :Jan,\n      :Kelly   :Lois    :Mary      :Noah,\n      :Piper   :Quinn   :Robert    :Sally,\n      :Tuck    :Udy     :Violette  :William,\n      :Xavier  :Yesler  :Zane\n\n    .then ->\n      @models.allUsers.reload ""\n\n  render: ->\n    Element\n      &StyleProps.background\n\n      Element\n        padding: 10\n        childrenLayout:   :column\n        childrenMargins:  10\n\n        Element\n          margin: 10\n          :parentWidthChildrenHeight\n          :row :childrenCenterLeft\n          childrenMargins:  10\n          TextElement\n            &TextStyles.titleText\n            :parentWidthChildrenHeight\n            text:   :${Caf.toString(
                          this.packageDotName
                        )}\n\n          &Button\n            text:   if @descending then :descending else :ascending\n            action: @models.viewState.toggleDescending\n\n          &Button\n            text:   :add-user\n            action: @addUser\n\n        &Users()`,
                        "Button.caf":
                          "import &StandardImport\n\nclass Button extends PointerActionsMixin Component\n\n  render: ->\n    Element\n      on:         @pointerHandlers\n      size:       cs: 1\n      padding:    10\n      cursor:     :pointer\n      animators:  :draw\n      draw:\n        rectangle: radius: 5\n        &Palette[if @hover then :secondary else :primary]\n\n      TextElement\n        &TextStyles.text\n        :childrenSize\n        color:  &TextPalette.white.primary\n        text:   @props.text"
                      },
                      "StyleProps.caf":
                        "import &StandardImport\nclass StyleProps extends HotStyleProps\n  @background: draw: #f7f7f7",
                      "Palette.caf":
                        "import &StandardImport\nclass Palette extends HotStyleProps\n  @primary: #48f\n  @secondary: #f49",
                      "TextPalette.caf":
                        "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @black:\n    primary:          rgbColor #000000d2\n    secondary:        rgbColor #0008\n    disabled:         rgbColor #0004\n\n  @white:\n    primary:          rgbColor #fffd\n    secondary:        rgbColor #fff8\n    disabled:         rgbColor #fff4",
                      "TextStyles.caf":
                        "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @text:\n    fontFamily: :sans-serif\n    color: &TextPalette.black.secondary\n\n  @titleText:\n    fontSize:   24\n    fontWeight: :bold\n    fontFamily: :sans-serif\n    color: &TextPalette.black.primary",
                      Models: {
                        "ViewState.caf":
                          "import &StandardImport\n\nclass ViewState extends ApplicationState\n  @stateFields\n    descending: true"
                      }
                    },
                    Pipelines: {
                      "User.caf":
                        "import &StandardImport\n\nclass User extends Pipeline\n  @publicRequestTypes :get :create :update :delete :allUsers\n  @query\n    allUsers: (request) -> array request.pipeline.db\n\n  constructor: ->\n    super\n    @db =\n      abc123: id: :abc123 name: :Alice\n      efg456: id: :efg456 name: :Bill\n\n  @handlers\n    get: ({key}) ->\n      @db[key]\n\n    create: ({data}) ->\n      @db[id = randomString()] = merge data, {} id\n\n    update: ({data, key}) ->\n      if @db[key]\n        @db[key] = merge @db[key], data\n\n    delete: ({key}) ->\n      if @db[key]\n        @db = objectWithout @db, key\n        true"
                    }
                  }
                }
              });
            }
          });
        }
      ));
    }
  );
});
