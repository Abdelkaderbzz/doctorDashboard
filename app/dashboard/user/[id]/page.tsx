"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowLeft } from "lucide-react"
type UserProfile = {
  id: string;
  name: string;
  age: number;
  gender: string;
  addiction: string;
  treatmentStartDate: string; // ISO date string
  strike: number;
  lastLogin: string; // ISO date string
  stepsCompleted: number[];
  substanceType: string;
  frequencyOfUse: string;
  durationOfUse: string;
  quantity: string;
  withdrawalSymptoms: string;
  overdoseHistory: string;
  healthComplications: string;
  infectiousDiseases: string;
  triggers: string;
  supportSystem: string;
  highRiskBehaviors: string;
  criminalInvolvement: string;
  previousAttempts: string;
  relapseHistory: string;
  barriersToTreatment: string;
  readinessForChange: number; // e.g., scale of 1-10
  recoveryGoals: string;
  perceivedBenefits: string;
  sobrietyStreak: number; // Days
  relapsesCount: number;
  therapyAttendance: number; // Percentage
  medicationAdherence: number; // Percentage
  weeklyMoodScores: number[];
};

// Extended mock user data with 5 users
const users = [
  {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "Male",
    addiction: "Alcohol",
    treatmentStartDate: "2023-01-15",
    strike: 2,
    lastLogin: "2023-06-10",
    stepsCompleted: [5, 7, 3, 8, 6, 4, 9],
    substanceType: "Alcohol",
    frequencyOfUse: "Daily",
    durationOfUse: "5 years",
    quantity: "750ml of vodka per day",
    withdrawalSymptoms: "Severe (tremors, anxiety, insomnia)",
    overdoseHistory: "None",
    healthComplications: "Liver damage",
    infectiousDiseases: "None",
    triggers: "Stress, social situations",
    supportSystem: "Supportive family",
    highRiskBehaviors: "Driving under influence",
    criminalInvolvement: "1 DUI charge",
    previousAttempts: "2 (AA meetings, outpatient rehab)",
    relapseHistory: "1 (after 6 months sober, due to job loss)",
    barriersToTreatment: "Cost of inpatient rehab",
    readinessForChange: 8,
    recoveryGoals: "Achieve sobriety, rebuild career",
    perceivedBenefits: "Improved health, better relationships",
    sobrietyStreak: 45,
    relapsesCount: 2,
    therapyAttendance: 85,
    medicationAdherence: 90,
    weeklyMoodScores: [6, 7, 5, 8, 6, 7, 8],
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    addiction: "Opioids",
    treatmentStartDate: "2023-03-22",
    strike: 0,
    lastLogin: "2023-06-12",
    stepsCompleted: [3, 5, 8, 6, 7, 9, 4],
    substanceType: "Prescription opioids",
    frequencyOfUse: "Multiple times daily",
    durationOfUse: "3 years",
    quantity: "60mg oxycodone per day",
    withdrawalSymptoms: "Moderate (nausea, muscle aches)",
    overdoseHistory: "1 non-fatal overdose",
    healthComplications: "Chronic constipation",
    infectiousDiseases: "None",
    triggers: "Chronic pain, anxiety",
    supportSystem: "Supportive partner, estranged from family",
    highRiskBehaviors: "Doctor shopping",
    criminalInvolvement: "None",
    previousAttempts: "1 (methadone maintenance)",
    relapseHistory: "2 (due to inadequate pain management)",
    barriersToTreatment: "Fear of withdrawal",
    readinessForChange: 6,
    recoveryGoals: "Find alternative pain management, reconnect with family",
    perceivedBenefits: "Freedom from addiction, improved mental health",
    sobrietyStreak: 30,
    relapsesCount: 2,
    therapyAttendance: 70,
    medicationAdherence: 80,
    weeklyMoodScores: [5, 6, 4, 7, 5, 6, 7],
  },
  {
    id: "3",
    name: "Mike Johnson",
    age: 42,
    gender: "Male",
    addiction: "Cocaine",
    treatmentStartDate: "2022-11-30",
    strike: 1,
    lastLogin: "2023-06-11",
    stepsCompleted: [6, 4, 7, 5, 8, 3, 6],
    substanceType: "Cocaine",
    frequencyOfUse: "Weekly binges",
    durationOfUse: "7 years",
    quantity: "3-5 grams per binge",
    withdrawalSymptoms: "Mild (fatigue, depression)",
    overdoseHistory: "None",
    healthComplications: "Nasal damage, heart palpitations",
    infectiousDiseases: "None",
    triggers: "Work stress, parties",
    supportSystem: "Supportive friends, no family support",
    highRiskBehaviors: "Unprotected sex",
    criminalInvolvement: "1 possession charge",
    previousAttempts: "3 (outpatient rehab, therapy)",
    relapseHistory: "Multiple, shortest period sober was 2 months",
    barriersToTreatment: "Work commitments, stigma",
    readinessForChange: 7,
    recoveryGoals: "Maintain sobriety, improve work-life balance",
    perceivedBenefits: "Career advancement, financial stability",
    sobrietyStreak: 60,
    relapsesCount: 5,
    therapyAttendance: 90,
    medicationAdherence: 100,
    weeklyMoodScores: [7, 8, 6, 9, 7, 8, 9],
  },
  {
    id: "4",
    name: "Emily Chen",
    age: 31,
    gender: "Female",
    addiction: "Gambling",
    treatmentStartDate: "2023-02-18",
    strike: 1,
    lastLogin: "2023-06-13",
    stepsCompleted: [4, 6, 5, 7, 8, 6, 7],
    substanceType: "N/A",
    frequencyOfUse: "Daily online gambling",
    durationOfUse: "4 years",
    quantity: "Average $500 per day",
    withdrawalSymptoms: "Moderate (anxiety, irritability)",
    overdoseHistory: "N/A",
    healthComplications: "Depression",
    infectiousDiseases: "None",
    triggers: "Financial stress, boredom",
    supportSystem: "Supportive parents, few close friends",
    highRiskBehaviors: "Taking loans for gambling",
    criminalInvolvement: "None",
    previousAttempts: "1 (Gamblers Anonymous)",
    relapseHistory: "1 (after 3 months, due to job loss)",
    barriersToTreatment: "Shame, denial of problem severity",
    readinessForChange: 7,
    recoveryGoals: "Financial stability, rebuild relationships",
    perceivedBenefits: "Debt-free life, improved mental health",
    sobrietyStreak: 21,
    relapsesCount: 1,
    therapyAttendance: 80,
    medicationAdherence: 0,
    weeklyMoodScores: [6, 7, 6, 8, 7, 7, 8],
  },
  {
    id: "5",
    name: "Alex Thompson",
    age: 25,
    gender: "Non-binary",
    addiction: "Methamphetamine",
    treatmentStartDate: "2023-04-05",
    strike: 3,
    lastLogin: "2023-06-09",
    stepsCompleted: [2, 3, 4, 3, 5, 4, 6],
    substanceType: "Methamphetamine",
    frequencyOfUse: "Multiple times daily",
    durationOfUse: "2 years",
    quantity: "1-2 grams per day",
    withdrawalSymptoms: "Severe (extreme fatigue, depression, cravings)",
    overdoseHistory: "2 non-fatal overdoses",
    healthComplications: "Dental problems, weight loss",
    infectiousDiseases: "Hepatitis C",
    triggers: "Peer pressure, depression",
    supportSystem: "Limited, one supportive sibling",
    highRiskBehaviors: "Needle sharing, unprotected sex",
    criminalInvolvement: "2 possession charges",
    previousAttempts: "2 (inpatient rehab, outpatient program)",
    relapseHistory: "3 (shortest period sober was 1 month)",
    barriersToTreatment: "Lack of insurance, distrust in healthcare system",
    readinessForChange: 5,
    recoveryGoals: "Stable housing, reconnect with family",
    perceivedBenefits: "Improved physical health, employment opportunities",
    sobrietyStreak: 15,
    relapsesCount: 3,
    therapyAttendance: 60,
    medicationAdherence: 75,
    weeklyMoodScores: [4, 5, 3, 6, 4, 5, 6],
  },
]

export default function UserStatistics() {
  const params = useParams()
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const userId = params.id
    const foundUser = users.find((u) => u.id === userId)
    setUser(foundUser || null)
  }, [params.id])

  if (!user) {
    return <div>User not found</div>
  }

  const completionPercentage = Math.floor(Math.random() * 101) // Random progress between 0-100%

  const chartData = user.stepsCompleted.map((steps, index) => ({
    name: `Day ${index + 1}`,
    steps: steps,
  }))

  const moodData = user.weeklyMoodScores.map((score, index) => ({
    name: `Day ${index + 1}`,
    score: score,
  }))

  const adherenceData = [
    { name: "Therapy", value: user.therapyAttendance },
    { name: "Missed", value: 100 - user.therapyAttendance },
  ]

  const medicationData = [
    { name: "Taken", value: Number(user.medicationAdherence)},
    { name: "Missed", value: 100 - Number(user.medicationAdherence) },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="container mx-auto py-10">
      <Link href="/dashboard" className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">User Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>Basic Information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Addiction:</strong> {user.addiction}
            </p>
            <p>
              <strong>Treatment Start Date:</strong> {user.treatmentStartDate}
            </p>
            <p>
              <strong>Current Strike:</strong> {user.strike}
            </p>
            <p>
              <strong>Last Login:</strong> {user.lastLogin}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Substance Use Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Type of Substance:</strong> {user.substanceType}
            </p>
            <p>
              <strong>Frequency of Use:</strong> {user.frequencyOfUse}
            </p>
            <p>
              <strong>Duration of Use:</strong> {user.durationOfUse}
            </p>
            <p>
              <strong>Quantity:</strong> {user.quantity}
            </p>
            <p>
              <strong>Withdrawal Symptoms:</strong> {user.withdrawalSymptoms}
            </p>
            <p>
              <strong>Overdose History:</strong> {user.overdoseHistory}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Steps Completed Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-teal-600">{completionPercentage}%</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                <div
                  style={{ width: `${completionPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                ></div>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Current Sobriety Streak:</strong> {user.sobrietyStreak} days
              </p>
              <p>
                <strong>Total Relapses:</strong> {user.relapsesCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Additional Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Mood Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Therapy Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adherenceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {adherenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medication Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={medicationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {medicationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

