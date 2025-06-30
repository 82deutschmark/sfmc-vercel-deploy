import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SPACE_EMOJIS } from "@/constants/spaceEmojis";
import { ChevronRight, ChevronLeft, BookOpen, Target, Zap } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Mission Control 2045",
    content: (
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <img 
            src="/wyatt-space-force.jpg" 
            alt="Sgt Wyatt" 
            className="w-32 h-32 rounded-full border-4 border-cyan-400 object-cover" 
          />
        </div>
        <h2 className="text-2xl font-bold text-cyan-400">Greetings, Cadet!</h2>
        <div className="bg-slate-900 border border-slate-600 rounded p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            I'm <span className="text-green-400 font-semibold">Sergeant Wyatt</span>, your training instructor. 
            You're joining the <span className="text-cyan-400 font-semibold">US Space Force Operations Center</span> where 
            humans excel at pattern recognition tasks that even the most advanced computers find challenging.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-900 border border-slate-600 rounded p-3">
            <h4 className="text-amber-400 font-semibold mb-1">Your Role</h4>
            <p className="text-slate-400">Pattern Recognition Specialist</p>
          </div>
          <div className="bg-slate-900 border border-slate-600 rounded p-3">
            <h4 className="text-amber-400 font-semibold mb-1">Starting Rank</h4>
            <p className="text-slate-400">Specialist 1 (E-1)</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Why Humans Beat AI",
    content: (
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center">
            <Zap className="w-8 h-8 text-slate-900" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-cyan-400 text-center">The Human Advantage</h3>
        <div className="bg-slate-900 border border-slate-600 rounded p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">1</div>
            <div>
              <h4 className="text-green-400 font-semibold text-sm">Instant Pattern Recognition</h4>
              <p className="text-slate-300 text-xs">You can see a mirror reflection immediately. Computers must calculate every single square.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">2</div>
            <div>
              <h4 className="text-amber-400 font-semibold text-sm">Spatial Understanding</h4>
              <p className="text-slate-300 text-xs">Your brain processes 2D relationships naturally. AI struggles with spatial concepts.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">3</div>
            <div>
              <h4 className="text-cyan-400 font-semibold text-sm">Inclusive Design</h4>
              <p className="text-slate-300 text-xs">We use space symbols instead of colors so everyone can participate, regardless of color vision differences.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Understanding Your Tools",
    content: (
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-slate-900" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-amber-400 text-center">The Grid System</h3>
        <div className="bg-slate-900 border border-slate-600 rounded p-4">
          <div className="grid grid-cols-5 gap-1 mb-4 max-w-40 mx-auto">
            {SPACE_EMOJIS.status_alerts.slice(0, 5).map((emoji, i) => (
              <div key={i} className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-sm">
                {emoji}
              </div>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-slate-300 text-xs mb-2">Numbers 0-4 shown as space symbols</p>
            <p className="text-slate-400 text-xs">Click any square to cycle through all 10 symbols (0-9)</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{SPACE_EMOJIS.status_alerts[0]}</span>
              <span className="text-slate-300">Black square = 0 (this is NOT empty - it's the number zero!)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{SPACE_EMOJIS.status_alerts[1]}</span>
              <span className="text-slate-300">Green check = 1 (success/active)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{SPACE_EMOJIS.status_alerts[2]}</span>
              <span className="text-slate-300">Red X = 2 (error/inactive)</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Your Training Plan",
    content: (
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-slate-900" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-green-400 text-center">5-Step Tutorial Program</h3>
        <div className="space-y-3">
          {[
            { id: "TUT-001", title: "Understanding Your Grid", desc: "Learn what you're looking at" },
            { id: "TUT-002", title: "Your First Change", desc: "Make your first grid modification" },
            { id: "TUT-003", title: "Mirror Magic", desc: "Master horizontal reflection" },
            { id: "TUT-004", title: "Vertical Reflection", desc: "Flip patterns up and down" },
            { id: "TUT-005", title: "Pattern Completion", desc: "Fill in missing pieces" }
          ].map((tutorial, i) => (
            <Card key={tutorial.id} className="bg-slate-900 border-slate-600">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-cyan-400 font-semibold text-sm">{tutorial.title}</h4>
                    <p className="text-slate-400 text-xs">{tutorial.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-600 rounded p-3">
          <p className="text-amber-300 text-xs text-center">
            Complete these tutorials to unlock regular missions and advance your rank!
          </p>
        </div>
      </div>
    )
  }
];

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-cyan-400 text-slate-50">
        <DialogTitle className="sr-only">Mission Control 2045 Tutorial</DialogTitle>
        <div className="space-y-6 p-2 sm:p-4">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {tutorialSteps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentStep ? 'bg-cyan-400' : 
                  i < currentStep ? 'bg-green-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Current step content */}
          <div className="min-h-[400px]">
            <h2 className="text-2xl font-bold text-center text-slate-200 mb-6">
              {tutorialSteps[currentStep].title}
            </h2>
            {tutorialSteps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-600">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <span className="text-slate-400 text-sm">
              {currentStep + 1} of {tutorialSteps.length}
            </span>

            {currentStep === tutorialSteps.length - 1 ? (
              <Button
                onClick={handleClose}
                className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold"
              >
                Start Training
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
