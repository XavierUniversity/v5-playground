# ITCSS Framework

Very basically, it's an inverted triangle of specificity. We start with the most generic (largest base)
and progress to the finest grains (the peak).

1. Settings -- Effectively SASS variables for brand colors, default sizes (using 8pt), etc.
2. Tools -- Mixins, or SASS Functions
3. Generic -- Low-specificity items, may include: 
    1. Normalize.css -- NOT Reset!
    2. Box-Sizing, font-smoothing, etc.
4. Base -- Most basic _unclassed_ elements, `a`, `form`, `ul`, etc.
5. Objects -- Objects follow [OOCSS](http://oocss.org/) (Object Oriented CSS) principles. They are small and reusable pieces with no aesthetics which can be used in UI composition. Examples are wrappers, grids, skins to apply to lists, buttons, inputs, etc. In other words: any pattern that is repeated over your UI is a potential object candidate. What ITCSS author said applies to this layer:
    1. Agnostically named (e.g. `.ui-list{}`)
    ```
    .ui-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .ui-list__item {
      padding: $spacing-unit;
    }
    ```
    2. May be skipped over in the layers and just move on to Components
6. Components -- well-designed pieces of UI that can be reused in more than one spot (or be applied to just one spot). Also, classes must be named explicitly: (e.g. `.products-list{}`)
7. Trumps -- Here you can have overrides, helpers, utilities, and specific classes that affect single pieces of the DOM, like, `.hidden`, `.relative`, `.one-half`, etc.

Additional reading: https://blog.codeminer42.com/how-to-organize-your-styles-with-itcss-3787cbc6dcbf
