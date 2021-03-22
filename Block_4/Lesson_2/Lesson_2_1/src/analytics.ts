import * as $ from "jquery";

function createAnalytics(): object {
  let counter = 0;
  let isDestroyed : boolean = false;

  const listener = (): number => counter++;

  //document.addEventListener("click", listener);
  $(document).on("click", listener);

  return {
    destroy() {
      //document.removeEventListener("click", listener);
      $(document).off("click", listener);
      isDestroyed = true;
    },

    getClicks() {
      if (isDestroyed) {
        return `Analytics is destroyed. Total clicks = ${counter}`;
      }
      return counter;
    }
  };
}

window["analytics"] = createAnalytics();