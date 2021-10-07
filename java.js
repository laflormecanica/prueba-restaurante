class BendyMenu {
    select = (s) => {
     return document.querySelector(s);
    };
    selectAll = (s) => {
     return document.querySelectorAll(s);
    };
    mainTl = new TimelineMax();
    followerVY = 0;
    drinkFollowerVY = 0;
    uiSVG = this.select("#uiSVG");
    dragMinY = -300;
    pathDataStart = "M.48,49s100.91,";
    bendyListItem = this.select("#bendyListItem");
    bendyUseItem = this.select(".bendyUseItem");
    dragContainer = this.select("#dragContainer");
    littleArrow = this.select("#littleArrow");
    xmlns = "http://www.w3.org/2000/svg";
    xlinkns = "http://www.w3.org/1999/xlink";
    container = this.select("#container");
   
    constructor() {
     TweenMax.set("svg", {
      visibility: "visible"
     });
   
     const follower = this.select("#follower");
     const drinkFollower = this.select("#drinkFollower");
     const viewingArea = this.select("#viewingArea");
     const viewingAreaHeight = Number(viewingArea.getAttribute("height"));
     const dragger = this.select("#dragger");
     const brandyLiquid = this.select("#brandyLiquid");
     const brandyCocktail = this.select("#brandyCocktail");
     const colorArr = [
      "#BA83D4",
      "#9FB6EE",
      "#EFB875",
      "#F97EA7",
      "#88EEED",
      "#B6DE7C"
     ];
     const drinkUri = [
      "#brandyCocktail",
      "#screwdriverCocktail",
      "#cherryCocktail",
      "#champagne",
      "#punch",
      "#brandyCocktail",
      "#screwdriverCocktail",
      "#cherryCocktail",
      "#champagne",
      "#punch",
      "#brandyCocktail"
     ];
     const labelArr = [
      "Piña Colada",
      "Screwdriver",
      "Marketing Champagne",
      "Cherry Seinfeld",
      "Fruit Punch",
      "Tequila Sunset",
      "Straight Whiskey",
      "Martini Bopper",
      "Harvey Wallbanger",
      "Bloody Marvin",
      "Woo Woo",
      ""
     ];
     let i = drinkUri.length;
     let strokeWidth = Number(this.bendyListItem.getAttribute("stroke-width"));
     let numItems = drinkUri.length;
   
     while (--i > -1) {
      let clone = this.bendyUseItem.cloneNode(true);
      this.dragContainer.appendChild(clone);
      clone
       .querySelector(".drink")
       .setAttributeNS(this.xlinkns, "xlink:href", drinkUri[i % drinkUri.length]);
      TweenMax.set(clone, {
       x: 220,
       y: i * strokeWidth + strokeWidth / 2 + 50
      });
      clone
       .querySelector("use")
       .setAttribute("stroke", colorArr[i % colorArr.length]);
      clone.querySelector("text").textContent = labelArr[i % labelArr.length];
     }
   
     Draggable.create(this.dragContainer, {
      trigger: document.body,
      type: "y",
      bounds: {
       minY: -((numItems - 1) * strokeWidth) + (viewingAreaHeight - strokeWidth),
       maxY: 0
      },
      throwProps: true,
      onDrag: this.onDrag,
      throwResistance: 100,
      edgeResistance: 0.91,
      minDuration: 0.2,
      maxDuration: 0.85,
      ease: Expo.easeOut,
      onRelease: this.onRelease,
      overshootTolerance: 0.85,
      allowContextMenu: true
     });
   
     TweenMax.set(".drinkLiquid", {
      transformOrigin: "50% 50%"
     });
   
     TweenMax.set("#olive", {
      transformOrigin: "100% 100%"
     });
   
     TweenMax.to(follower, 1, {
      y: "+=0",
      repeat: -1,
      modifiers: {
       y: (y, count) => {
        this.followerVY +=
         (this.dragContainer._gsTransform.y - follower._gsTransform.y) * 0.8;
        this.followerVY *= 0.5;
        return follower._gsTransform.y + this.followerVY;
       }
      },
      onUpdate: this.onUpdate
     });
   
     TweenMax.to(drinkFollower, 1, {
      y: "+=0",
      repeat: -1,
      modifiers: {
       y: (y, count) => {
        this.drinkFollowerVY +=
         (this.dragContainer._gsTransform.y - drinkFollower._gsTransform.y) * 0.02;
        this.drinkFollowerVY *= 0.95;
        return drinkFollower._gsTransform.y + this.drinkFollowerVY;
       }
      }
     });
   
     TweenMax.to(this.littleArrow, 1, {
      y: "+=0",
      repeat: -1,
      modifiers: {
       y: (y, count) => {
        return -this.followerVY * 0.25;
       }
      }
     });
     TweenMax.to("text", 1, {
      y: "+=0",
      repeat: -1,
      modifiers: {
       y: (y, count) => {
        return -this.followerVY * 0.8;
       }
      }
     });
     TweenMax.staggerTo(
      ".drinkItem",
      1,
      {
       y: "+=0",
       repeat: -1,
       modifiers: {
        y: (y, count) => {
         return -this.drinkFollowerVY * 0.08;
        }
       }
      },
      0.1
     );
   
     TweenMax.to(".drinkLiquid", 1, {
      rotation: "+=0",
      repeat: -1,
      modifiers: {
       rotation: (rotation) => {
        return this.drinkFollowerVY * 0.58;
       }
      }
     });
   
     TweenMax.to("#olive", 1, {
      rotation: "+=0",
      repeat: -1,
      modifiers: {
       rotation: (rotation) => {
        return Math.abs(this.followerVY * 0.38);
       }
      },
      ease: Bounce.easeOut
     });
   
     TweenMax.to(".cocktail", 1, {
      y: "+=0",
      repeat: -1,
      modifiers: {
       y: (y) => {
        return -this.followerVY * 0.8;
       }
      }
     });
   
     document.addEventListener("touchmove", function (event) {
      event.preventDefault();
     });
   
     //ScrubGSAPTimeline(this.timeline);
     TweenMax.staggerFrom(
      this.nodeListToArray(this.selectAll(".bendyUseItem"), true),
      1.3,
      {
       y: "+=500",
       ease: Elastic.easeOut.config(0.8, 0.8)
      },
      0.05
     );
     TweenMax.from(this.dragContainer, 1, {
      alpha: 0,
      ease: Sine.easeOut
     });
    }
   
    onRelease = () => {};
    nodeListToArray(list, rev) {
     var k = Array.prototype.slice.call(list);
     return rev ? k.reverse() : k;
    }
   
    onDrag = () => {
     let followerVY = dragContainer._gsTransform.y / 4;
     let halfVal = 180;
     let path = `${
      this.pathDataStart
     }${followerVY},${halfVal},${followerVY},${halfVal},${-followerVY},${halfVal},${-followerVY}`;
     this.bendyListItem.setAttribute("d", path);
    };
   
    onUpdate = () => {
     if (dragContainer._gsTransform.y > 0) {
      this.onDrag();
      return;
     }
     let followerVY = -Math.round(this.followerVY) * 0.993;
     let halfVal = 180;
     let path = `${
      this.pathDataStart
     }${followerVY},${halfVal},${followerVY},${halfVal},${-followerVY},${halfVal},${-followerVY}`;
     this.bendyListItem.setAttribute("d", path);
    };
   }
   
   var bendyMenu = new BendyMenu();
   