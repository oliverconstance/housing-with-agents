# Comprehensive UI Test Coverage

This document outlines the test scenarios required to ensure the React UI components function perfectly across edge cases.

## A. Core Component Tests

### 1. FilterBar Component
- **TC-FB-01**: Selecting 'all' for every filter should return the mock multiplier to exactly `1.0`.
- **TC-FB-02**: Select 'London' for Region. The `onChange` handler must fire and the deterministic multiplier algorithm must yield a unique value distinct from '1.0'.
- **TC-FB-03**: Verify multi-selection combinations. Selecting 'Scotland' + 'Terraced' + 'Social Rented' + 'EPC Band A/B' simultaneously should successfully compound the 4 multipliers without returning `NaN` or `undefined`.
- **TC-FB-04**: Rapidly changing the same filter back and forth must cleanly update the internal component state without hanging the browser.

### 2. FactTooltip Component
- **TC-FT-01**: Hovering over the wrapped element should render the tooltip with the `show` state evaluating to `true`.
- **TC-FT-02**: Moving the mouse outside the hit area should instantly evaluate `show` to `false` and remove the tooltip from the DOM.
- **TC-FT-03**: Clicking the source link must open in a new tab (`target="_blank"`) and preserve security standards (`rel="noreferrer"`).
- **TC-FT-04**: Verify z-index layering ensures the tooltip appears *above* the Recharts Timeline Chart and other floating UI elements.

## B. Page-Level Integration Tests

### 1. Current Stock Page
- **TC-STK-01**: Verify that selecting any combination of Region, Type, Ownership, or EPC Band causes both the Data Cards and the Timeline Chart to visually update and recalculate using the multiplier algorithm.
- **TC-STK-02**: Validate the final data point on the x-axis explicitly reads "Jul 2026".
- **TC-STK-03**: Validate that trend indicators (Up/Down/Neutral arrows) update depending on whether the multiplier is `1`, `< 1`, or `> 1`.

### 2. House-Building Page
- **TC-BLD-01**: Verify that clicking the "Yearly Completions" button switches the chart's y-axis to the `completions` object key.
- **TC-BLD-02**: Verify that clicking the "Cumulative Total" button switches the chart's y-axis to the `cumulative` object key and updates the Chart Title.
- **TC-BLD-03**: Combine state actions: Switch to "Cumulative", then change the 'Developer' filter to "Housing Association". The chart must correctly render the compounding of the filter against the cumulative dataset.

### 3. Policy Tracker (Nested Routing)
- **TC-POL-01**: Navigating to `/policy` should automatically redirect to `/policy/manifesto`.
- **TC-POL-02**: The `NavLink` for "Manifesto Tracker" should show the active border styling (`3px solid var(--accent-primary)`) when its route is active.
- **TC-POL-03**: Clicking "Policy Summaries" should instantly swap the sub-component layout without reloading the whole page (SPA transition).

### 4. Fact-Checking Archive
- **TC-FC-01 (Search)**: Typing "Shadow Chancellor" should instantly filter out all cards that do not contain this string in either the politician name or the quote.
- **TC-FC-02 (Case-Insensitive Search)**: Typing "shadow chancellor" (lowercase) should yield the exact same result as TC-FC-01.
- **TC-FC-03 (Verdict Filter)**: Changing the dropdown to "Misleading" should hide all cards that do not strictly equal the `Misleading` type.
- **TC-FC-04 (Combined Filter)**: Searching for "Homeownership" while the dropdown is set to "False" should yield 0 results (empty state message must render).
- **TC-FC-05 (Accordion)**: Clicking a compact fact-check card should expand it, revealing the Vertex AI analysis and the source link. Clicking it again should collapse it.
