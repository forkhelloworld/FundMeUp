"use client";

import { useState } from "react";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {isLoginMode ? <LoginForm /> : <RegistrationForm />}

      <Card className="bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-md rounded-xl hover:shadow-emerald-500/10 transition-all duration-300">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-2">
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="w-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 font-mono transition-all duration-200 hover:scale-105"
            >
              {isLoginMode ? "Create Account" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
