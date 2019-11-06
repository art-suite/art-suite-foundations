# TODO
  - new options:
    - flatten: true - if source is an array, recurse into any sub-arrays
    - compact: effectively `when: (v) -> v?` except you can also have your own when-function in addition, run after this one.
    - while/until: () -> T/F
    - from/til/to/by/short/skip