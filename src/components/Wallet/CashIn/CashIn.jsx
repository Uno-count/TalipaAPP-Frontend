import { currency } from "@/helpers/utils";
import { Button, Input } from "antd";
import useCashInMethod from "./hooks/useCashInMethod";

export default function CashIn({ logo, method, label,...props }) {
  const {
    isLoading,
    amount,
    setAmount,
    total,
    handleSubmit,
    fees,
  } = useCashInMethod(method);

  return (
    <div {...props}>
      <div className="bg-white p-2 py-4">
        <div className="mb-2">Input Amount</div>
        <div>
          <Input
            disabled={isLoading}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              const amount = isNaN(val) ? 0 : val;
              setAmount(amount);
            }}
            value={amount}
            prefix="₱"
            type="number"
            size="large"
            className="rounded text-xl font-medium text-primary"
          />
        </div>
      </div>

      <div className="mt-2 bg-white p-2 py-4">
        <div className="mb-2">Payment</div>
        <div className=" flex items-center gap-4 text-black">
          <div>
            <img src={logo} className="h-8 w-8 rounded" />
          </div>
          <div className="flex-grow text-lg capitalize">{label}</div>
        </div>
      </div>

      <div className="mt-2 bg-white p-2 py-4">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Cash In</span>
          <span>{currency(amount)}</span>
        </div>
        {fees.map((fee) => (
          <div key={fee.label} className="flex justify-between">
            <span className="text-sm text-slate-600">{fee.label}</span>
            <span>{currency(fee.amount)}</span>
          </div>
        ))}
        <div className="flex justify-between text-base font-bold text-primary">
          <span className="">Total</span>
          <span>{currency(total)}</span>
        </div>

        <Button
          onClick={handleSubmit}
          loading={isLoading}
          size="large"
          type="primary"
          className="mt-4 rounded"
          block
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}
