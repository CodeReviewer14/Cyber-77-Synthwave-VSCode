(function () {

  // Grab body node
  const bodyNode = document.querySelector('body');

  // Replace the styles with the glow theme
  const initNeonDreams = (disableGlow, obs) => {
    var themeStyleTag = document.querySelector('.vscode-tokens-styles');

    if (!themeStyleTag) {
      return;
    }

    var initialThemeStyles = themeStyleTag.innerText;

    var updatedThemeStyles = initialThemeStyles;

    if (!disableGlow) {
      /* replace acquamarine green */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #c2f8cb;/g, "color: #f1f9f2; text-shadow: 0 0 2px #001709, 0 0 3px #3af759[NEON_BRIGHTNESS], 0 0 5px #3af759[NEON_BRIGHTNESS]");
            
      /* replace cyan */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #88dcf6;/g, "color: #d1ebf3; text-shadow: 0 0 2px #001716, 0 0 3px #03edf9[NEON_BRIGHTNESS], 0 0 5px #03edf9[NEON_BRIGHTNESS]");

      /* replace berry pink */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #ff3d7f;/g, "color: #ff3d7f; text-shadow: 0 0 8px #ff29c5[NEON_BRIGHTNESS]");

      /* replace orange */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #ffc19a;/g, "color: #f9efe9; text-shadow: 0 0 2px #171200, 0 0 3px #ff7c29[NEON_BRIGHTNESS], 0 0 5px #ff7c29[NEON_BRIGHTNESS], 0 0 8px #ff7c29[NEON_BRIGHTNESS];");
      
      /* replace yellow */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fff9b8;/g, "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #ffce00[NEON_BRIGHTNESS], 0 0 5px #ffce00[NEON_BRIGHTNESS], 0 0 8px #ffce00[NEON_BRIGHTNESS];");
    }

    /* append the remaining styles */
    updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;

    const newStyleTag = document.createElement('style');
    newStyleTag.setAttribute("id", "synthwave-84-theme-styles");
    newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
    document.body.appendChild(newStyleTag);

    console.log("Cyber '77: NEON DREAMS initialized!");

    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
    }
  };

  // Callback function to execute when mutations are observed
  const watchForBootstrap = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            // only init if we're using a Synthwave 84 subtheme
            const isUsingSynthwave = document.querySelector(
              '[class*="cyber77-vscode-themes"]'
            );
            // does the style div exist yet?
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            // does it have content ?
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;

            // sometimes VS code takes a while to init the styles content, so stop this observer and add an observer for that
            if (isUsingSynthwave && tokensLoaded) {
              observer.disconnect();
              observer.observe(tokensLoaded, { childList: true });
            }
          }
          if (mutation.type === 'childList') {
            const isUsingSynthwave = document.querySelector(
              '[class*="cyber77-vscode-themes"]'
            );
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;

            // Everything we need is ready, so initialise
            if (isUsingSynthwave && tokensLoaded && tokenStyles) {
                initNeonDreams([DISABLE_GLOW], observer);
            }
          }
      }
  };

  // try to initialise the theme
  initNeonDreams([DISABLE_GLOW]);

  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true });

})();
