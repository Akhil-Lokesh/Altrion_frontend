# Future Feature: Interactive Loan Slider

## Description
Interactive slider on the Dashboard Loan Eligibility card that lets users adjust the loan percentage and see the amount in real-time.

## Code to Add

### 1. Add state in Dashboard.tsx (after other useState declarations)
```tsx
const [loanPercent, setLoanPercent] = useState(mockLoanEligibility.maxLTV);
```

### 2. Replace the Loan Eligibility card with this:
```tsx
{/* Loan Eligibility */}
<motion.div variants={ITEM_VARIANTS}>
  <Card variant="bordered">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-altrion-500/20 flex items-center justify-center">
          <Wallet size={20} className="text-altrion-400" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold text-text-primary">Loan Eligibility</h3>
          <p className="text-sm text-text-secondary">Based on your portfolio</p>
        </div>
      </div>

      {/* Interactive Loan Slider */}
      <div className="flex-1 max-w-md mx-4 px-5 py-4 bg-dark-elevated/80 backdrop-blur rounded-xl border border-dark-border">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-lg font-semibold text-text-primary">
            {formatCurrency((mockLoanEligibility.eligibleCollateral * loanPercent) / 100)}
          </span>
          <span className="text-xs font-medium text-text-muted px-2 py-0.5 bg-dark-border/50 rounded">
            {loanPercent}% LTV
          </span>
        </div>
        {/* Slider */}
        <input
          type="range"
          min="10"
          max={mockLoanEligibility.maxLTV}
          value={loanPercent}
          onChange={(e) => setLoanPercent(Number(e.target.value))}
          className="w-full h-1.5 bg-dark-border/50 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:h-3.5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-altrion-400
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-3.5
            [&::-moz-range-thumb]:h-3.5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-altrion-400
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(16 185 129 / 0.4) 0%, rgb(16 185 129 / 0.4) ${((loanPercent - 10) / (mockLoanEligibility.maxLTV - 10)) * 100}%, rgb(30 41 59 / 0.5) ${((loanPercent - 10) / (mockLoanEligibility.maxLTV - 10)) * 100}%, rgb(30 41 59 / 0.5) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-text-muted mt-1.5">
          <span>10%</span>
          <span>Max {mockLoanEligibility.maxLTV}%</span>
        </div>
      </div>

      <Button onClick={handleApplyForLoan}>
        Apply for a Loan
        <ArrowUpRight size={16} />
      </Button>
    </div>
  </Card>
</motion.div>
```

## Features
- Slider ranges from 10% to max LTV (60%)
- Real-time amount calculation based on selected percentage
- Styled slider thumb with hover effect
- Progress fill on track
- Contained in a styled box matching other dashboard elements
