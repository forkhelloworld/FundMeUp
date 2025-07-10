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
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="w-full"
            >
              {isLoginMode ? "Create Account" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 