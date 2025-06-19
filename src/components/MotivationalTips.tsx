
import React from 'react';

const tips = [
  {
    title: "Respire Profundo",
    description: "Use estes 5 minutos para focar na sua respiração e relaxar.",
    icon: "🌬️"
  },
  {
    title: "Gratidão",
    description: "Pense em 3 coisas pelas quais você é grata hoje.",
    icon: "🙏"
  },
  {
    title: "Alongue-se",
    description: "Movimente o corpo suavemente e alivie as tensões.",
    icon: "🤸‍♀️"
  }
];

const MotivationalTips = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {tips.map((tip, index) => (
        <div key={index} className="glass-effect border border-pink-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-3xl mb-3">{tip.icon}</div>
          <h3 className="font-bold text-rose-800 mb-2">{tip.title}</h3>
          <p className="text-pink-600 text-sm">{tip.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MotivationalTips;
