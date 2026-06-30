function SummaryCard({ title, value }) {
  return (
    <div className="bg-black rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
      <h3 className="text-yellow-400 text-sm uppercase tracking-widest">
          {title}
      </h3>

      <p className="text-yellow-400 text-4xl font-extrabold mt-3">
          {value}
      </p>
    </div>
  );
}

export default SummaryCard;