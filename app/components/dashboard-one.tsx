'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, FileText, Filter, Info, LineChart as LineChartIcon, LogOut, Menu, Moon, Search, Sun, AlertTriangle, CheckCircle, X, Activity, Clock, User, FileBarChart, Database, Globe, Shield, Truck, Plus, Pencil, Trash, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Legend } from 'recharts'
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const adoptionData = [
  { month: 'Jan', adoption: 65 },
  { month: 'Feb', adoption: 68 },
  { month: 'Mar', adoption: 72 },
  { month: 'Apr', adoption: 75 },
  { month: 'May', adoption: 79 },
  { month: 'Jun', adoption: 82 },
]

const energySourceData = [
  { name: 'Clean Cooking', value: 45 },
  { name: 'Traditional', value: 55 },
]

const adoptionPredictionData = [
  { year: 2023, actual: 82, predicted: 82 },
  { year: 2024, actual: null, predicted: 88 },
  { year: 2025, actual: null, predicted: 93 },
  { year: 2026, actual: null, predicted: 96 },
  { year: 2027, actual: null, predicted: 98 },
]

const impactMetrics = [
  { name: 'Health Improvements', value: 75 },
  { name: 'Time Saved', value: 60 },
  { name: 'Cost Savings', value: 45 },
  { name: 'Environmental Impact', value: 80 },
]

const monthlyAdoptionData = [
  { month: 'Jan', newAdopters: 5000, cumulativeAdopters: 100000 },
  { month: 'Feb', newAdopters: 5500, cumulativeAdopters: 105500 },
  { month: 'Mar', newAdopters: 6000, cumulativeAdopters: 111500 },
  { month: 'Apr', newAdopters: 6200, cumulativeAdopters: 117700 },
  { month: 'May', newAdopters: 6500, cumulativeAdopters: 124200 },
  { month: 'Jun', newAdopters: 7000, cumulativeAdopters: 131200 },
]

const regionalPerformanceData = [
  { region: 'Arusha', adoptionRate: 75, emissionsReduced: 15000 },
  { region: 'Dar es Salaam', adoptionRate: 85, emissionsReduced: 25000 },
  { region: 'Dodoma', adoptionRate: 65, emissionsReduced: 12000 },
  { region: 'Mwanza', adoptionRate: 70, emissionsReduced: 18000 },
  { region: 'Zanzibar', adoptionRate: 60, emissionsReduced: 10000 },
]

const notificationData = [
  { id: 1, type: 'alert', title: 'Low Adoption Rate', message: 'Adoption rate in Zanzibar has dropped below 50%', time: '2 hours ago', read: false },
  { id: 2, type: 'success', title: 'Milestone Achieved', message: 'Dar es Salaam has reached 90% adoption rate', time: '1 day ago', read: true },
  { id: 3, type: 'info', title: 'New Report Available', message: 'Q2 2023 Impact Report is now available for review', time: '3 days ago', read: false },
  { id: 4, type: 'alert', title: 'Supply Shortage', message: 'Clean cooking stove inventory low in Dodoma region', time: '1 week ago', read: true },
  { id: 5, type: 'success', title: 'Emissions Milestone', message: 'Total CO2 emissions reduced has surpassed 1 million tons', time: '2 weeks ago', read: false },
]

const notificationTypeData = [
  { name: 'Alerts', value: 35 },
  { name: 'Success', value: 40 },
  { name: 'Info', value: 25 },
]

const weeklyNotificationData = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 8 },
  { day: 'Wed', count: 12 },
  { day: 'Thu', count: 7 },
  { day: 'Fri', count: 10 },
  { day: 'Sat', count: 4 },
  { day: 'Sun', count: 3 },
]

const activityLogData = [
  { id: 1, type: 'user', action: 'Login', user: 'John Doe', timestamp: '2023-10-27 09:00:00' },
  { id: 2, type: 'report', action: 'Generated Monthly Report', user: 'Jane Smith', timestamp: '2023-10-27 10:15:00' },
  { id: 3, type: 'data', action: 'Updated Adoption Rate', user: 'Mike Johnson', timestamp: '2023-10-27 11:30:00' },
  { id: 4, type: 'alert', action: 'Created New Alert', user: 'Sarah Brown', timestamp: '2023-10-27 13:45:00' },
  { id: 5, type: 'user', action: 'Password Change', user: 'John Doe', timestamp: '2023-10-27 15:00:00' },
]

const activityTypeData = [
  { name: 'User Actions', value: 35 },
  { name: 'Report Generation', value: 25 },
  { name: 'Data Updates', value: 20 },
  { name: 'Alerts', value: 20 },
]

const dailyActivityData = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 52 },
  { day: 'Wed', count: 49 },
  { day: 'Thu', count: 60 },
  { day: 'Fri', count: 55 },
  { day: 'Sat', count: 30 },
  { day: 'Sun', count: 28 },
]

const supplierData = [
  { id: 1, name: 'EcoStove Ltd.', product: 'Clean Cookstoves', inventory: 1200, lastDelivery: '2023-10-20', performance: 95 },
  { id: 2, name: 'GreenFuel Co.', product: 'Biofuel', inventory: 5000, lastDelivery: '2023-10-25', performance: 88 },
  { id: 3, name: 'SolarCook Inc.', product: 'Solar Cookers', inventory: 800, lastDelivery: '2023-10-18', performance: 92 },
  { id: 4, name: 'BioMass Solutions', product: 'Biomass Pellets', inventory: 10000, lastDelivery: '2023-10-22', performance: 90 },
  { id: 5, name: 'CleanHeat Systems', product: 'Induction Cooktops', inventory: 600, lastDelivery: '2023-10-23', performance: 87 },
]

const supplierPerformanceData = [
  { name: 'EcoStove Ltd.', performance: 95 },
  { name: 'GreenFuel Co.', performance: 88 },
  { name: 'SolarCook Inc.', performance: 92 },
  { name: 'BioMass Solutions', performance: 90 },
  { name: 'CleanHeat Systems', performance: 87 },
]

const tanzaniaGeoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/tanzania/tanzania-regions.json"

const regionData = [
  { name: "Arusha", coordinates: [36.6827, -3.3869], adoptionRate: 75 },
  { name: "Dar es Salaam", coordinates: [39.2083, -6.7924], adoptionRate: 85 },
  { name: "Dodoma", coordinates: [35.7516, -6.1722], adoptionRate: 65 },
  { name: "Mwanza", coordinates: [32.8972, -2.5164], adoptionRate: 70 },
  { name: "Zanzibar", coordinates: [39.1994, -6.1659], adoptionRate: 60 },
  { name: "Mbeya", coordinates: [33.4450, -8.9000], adoptionRate: 72 },
  { name: "Morogoro", coordinates: [37.6633, -6.8235], adoptionRate: 68 },
  { name: "Tanga", coordinates: [39.1044, -5.0700], adoptionRate: 63 },
]

const adoptionTrendData = [
  { year: 2018, rate: 45 },
  { year: 2019, rate: 52 },
  { year: 2020, rate: 58 },
  { year: 2021, rate: 65 },
  { year: 2022, rate: 72 },
  { year: 2023, rate: 78 },
]

const COLORS = ['#006871', '#c7e5d0', '#003b3f', '#ffffff']

export default function DashboardOne() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [reportType, setReportType] = useState('monthly')
  const [reportPeriod, setReportPeriod] = useState('last6months')
  const [notifications, setNotifications] = useState(notificationData)
  const [unreadCount, setUnreadCount] = useState(0)
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    dataRefreshRate: 5,
    language: 'en',
    dataPrivacy: 'high',
  })
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastActive: '2023-10-27 09:00:00' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', lastActive: '2023-10-27 10:15:00' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Analyst', lastActive: '2023-10-27 11:30:00' },
    { id: 4, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Viewer', lastActive: '2023-10-27 13:45:00' },
  ])
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' })

  useEffect(() => {
    setUnreadCount(notifications.filter(notification => !notification.read).length)
  }, [notifications])

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    )
  }

  const updateSetting = (key: string, value: unknown) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }))
  }

  const addUser = () => {
    setUsers(prevUsers => [...prevUsers, { ...newUser, id: prevUsers.length + 1, lastActive: new Date().toISOString() }])
    setNewUser({ name: '', email: '', role: 'Viewer' })
    setIsAddUserModalOpen(false)
  }

  const deleteUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-[#c7e5d0] dark:bg-[#003b3f]">
        {/* Sidebar */}
        <aside className="w-64 bg-[#006871] text-white">
          <div className="p-4 flex items-center space-x-2">
            <span className="text-2xl font-bold">TCCMP</span>
          </div>
          <nav className="mt-6">
            {['overview', 'analytics', 'reports', 'geospatial', 'notifications', 'activityLog', 'suppliers', 'settings'].map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`w-full justify-start text-white ${activeTab === tab ? 'bg-[#003b3f]' : 'hover:bg-[#003b3f]'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'notifications' && unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
                )}
              </Button>
            
            ))}
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#003b3f]">
              Support
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-[#003b3f]">
          <header className="bg-[#006871] text-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search anything here"
                    className="pl-8 w-64 bg-white text-[#006871]"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="text-white">
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <div className="p-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-[#c7e5d0]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Clean Cooking Adoption Rate</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">82%</div>
                      <p className="text-xs text-[#003b3f]">+2.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#c7e5d0]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Households Reached</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">1.2M</div>
                      <p className="text-xs text-[#003b3f]">+100K from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#c7e5d0]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">CO2 Emissions Reduced</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">500K tons</div>
                      <p className="text-xs text-[#003b3f]">+50K tons from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#c7e5d0]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Active Regions</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">26/30</div>
                      <p className="text-xs text-[#003b3f]">+2 new regions this quarter</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Clean Cooking Adoption Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={adoptionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="adoption" stroke="#006871" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Energy Source Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={energySourceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {energySourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Indicator</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Indoor Air Quality</TableCell>
                          <TableCell>25 μg/m³</TableCell>
                          <TableCell className="text-green-600">-15%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Fuel Efficiency</TableCell>
                          <TableCell>45%</TableCell>
                          <TableCell className="text-green-600">+10%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Health Incidents</TableCell>
                          <TableCell>150 cases</TableCell>
                          <TableCell className="text-green-600">-30%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Predicted Adoption Rate (2027)</CardTitle>
                      <Info className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">98%</div>
                      <p className="text-xs text-[#003b3f]">+16% from current rate</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Estimated Impact Score</CardTitle>
                      <Info className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">8.5/10</div>
                      <p className="text-xs text-[#003b3f]">Based on multiple factors</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Primary Adoption Barrier</CardTitle>
                      <Info className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">Cost</div>
                      <p className="text-xs text-[#003b3f]">35% of non-adopters cite this</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Adoption Rate Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={adoptionPredictionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="#006871" strokeWidth={2} name="Actual" />
                          <Line type="monotone" dataKey="predicted" stroke="#c7e5d0" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={impactMetrics}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Impact" dataKey="value" stroke="#006871" fill="#006871" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Adoption Barriers Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { name: 'Cost', value: 35 },
                        { name: 'Awareness', value: 25 },
                        { name: 'Availability', value: 20 },
                        { name: 'Cultural Preferences', value: 15 },
                        { name: 'Technical Issues', value: 5 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#006871" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">AI-Generated Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>The adoption rate is projected to reach 98% by 2027, indicating strong growth potential.</li>
                      <li>Cost remains the primary barrier to adoption, suggesting a need for financial incentives or more affordable clean cooking solutions.</li>
                      <li>Health improvements and environmental impact show the highest scores in our impact analysis, highlighting the program's success in these areas.</li>
                      <li>Cultural preferences are a significant barrier, indicating a need for more culturally-sensitive clean cooking solutions and education programs.</li>
                      <li>The rapid increase in adoption rate correlates strongly with decreased health incidents, demonstrating the program's positive impact on public health.</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'reports' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#006871]">Generated Reports</h2>
                  <div className="flex space-x-4">
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-[180px] bg-[#c7e5d0] text-[#006871]">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Report</SelectItem>
                        <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        <SelectItem value="annual">Annual Report</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={reportPeriod} onValueChange={setReportPeriod}>
                      <SelectTrigger className="w-[180px] bg-[#c7e5d0] text-[#006871]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last6months">Last 6 Months</SelectItem>
                        <SelectItem value="last12months">Last 12 Months</SelectItem>
                        <SelectItem value="lastyear">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-[#006871] text-white hover:bg-[#003b3f]">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Total New Adopters</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">36,200</div>
                      <p className="text-xs text-[#003b3f]">+12% from previous period</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Cumulative Adopters</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">131,200</div>
                      <p className="text-xs text-[#003b3f]">31.2% of target households</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">CO2 Emissions Reduced</CardTitle>
                      <ChevronDown className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">80,000 tons</div>
                      <p className="text-xs text-[#003b3f]">+15% from previous period</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-6">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Monthly Adoption Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyAdoptionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="newAdopters" stroke="#006871" name="New Adopters" />
                          <Line yAxisId="right" type="monotone" dataKey="cumulativeAdopters" stroke="#c7e5d0" name="Cumulative Adopters" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Regional Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={regionalPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis yAxisId="left" orientation="left" stroke="#006871" />
                          <YAxis yAxisId="right" orientation="right" stroke="#c7e5d0" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="adoptionRate" fill="#006871" name="Adoption Rate (%)" />
                          <Bar yAxisId="right" dataKey="emissionsReduced" fill="#c7e5d0" name="Emissions Reduced (tons)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Key Findings and Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">Key Findings:</h3>
                    <ul className="list-disc pl-5 mb-4">
                      <li>Adoption rate has shown a steady increase, with a 12% growth in new adopters compared to the previous period.</li>
                      <li>Dar es Salaam leads in regional performance with an 85% adoption rate and 25,000 tons of emissions reduced.</li>
                      <li>CO2 emissions reduced have increased by 15%, contributing to environmental sustainability goals.</li>
                      <li>The program has reached 31.2% of target households, indicating strong progress towards full adoption.</li>
                    </ul>
                    <h3 className="font-semibold mb-2">Recommendations:</h3>
                    <ol className="list-decimal pl-5">
// Before:
value: "Last 6 Months" should be "Last 6 Months"
'can't' should be "can&apos;t"
'don't' should be "don&apos;t"

// Search through the file for any strings containing apostrophes and replace them with:
"can&apos;t"
"don&apos;t"
                      <li>Implement strategies to accelerate adoption in Dodoma and Mwanza to match the success seen in Dar es Salaam.</li>
                      <li>Continue health education programs to further reduce respiratory issues and burns related to traditional cooking methods.</li>
                      <li>Explore partnerships with local organizations to enhance the distribution and affordability of clean cooking solutions.</li>
                      <li>Develop a comprehensive plan to reach the remaining 68.8% of target households, with a focus on overcoming identified adoption barriers.</li>
                    </ol>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'geospatial' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Average Adoption Rate</CardTitle>
                      <MapPin className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">
                        {(regionData.reduce((sum, region) => sum + region.adoptionRate, 0) / regionData.length).toFixed(1)}%
                      </div>
                      <p className="text-xs text-[#003b3f]">Across all regions</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Highest Adoption Rate</CardTitle>
                      <MapPin className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">
                        {Math.max(...regionData.map(region => region.adoptionRate))}%
                      </div>
                      <p className="text-xs text-[#003b3f]">
                        {regionData.find(region => region.adoptionRate === Math.max(...regionData.map(r => r.adoptionRate)))?.name}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Lowest Adoption Rate</CardTitle>
                      <MapPin className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">
                        {Math.min(...regionData.map(region => region.adoptionRate))}%
                      </div>
                      <p className="text-xs text-[#003b3f]">
                        {regionData.find(region => region.adoptionRate === Math.min(...regionData.map(r => r.adoptionRate)))?.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Geospatial Adoption Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ width: "100%", height: "400px" }}>
                      <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                          scale: 2000,
                          center: [35, -6]
                        }}
                      >
                        <Geographies geography={tanzaniaGeoUrl}>
                          {({ geographies }) =>
                            geographies.map((geo) => (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#c7e5d0"
                                stroke="#006871"
                              />
                            ))
                          }
                        </Geographies>
                        {regionData.map(({ name, coordinates, adoptionRate }) => (
                          <Marker key={name} coordinates={coordinates as [number, number]}>
                            <circle r={5} fill="#006871" stroke="#fff" strokeWidth={2} />
                            <text
                              textAnchor="middle"
                              y={-10}
                              style={{ fontFamily: "system-ui", fill: "#006871", fontSize: "8px" }}
                            >
                              {name}
                              {''}
                              {adoptionRate}%
                            </text>
                          </Marker>
                        ))}
                      </ComposableMap>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Regional Adoption Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={regionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="adoptionRate" fill="#006871" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#006871]">Adoption Rate Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={adoptionTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="rate" stroke="#006871" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Total Notifications</CardTitle>
                      <Bell className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">{notifications.length}</div>
                      <p className="text-xs text-[#003b3f]">
                        {unreadCount} unread
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Notification Types</CardTitle>
                      <Filter className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={notificationTypeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={40}
                              fill="#006871"
                              dataKey="value"
                            >
                              {notificationTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center space-x-2">
                        {notificationTypeData.map((type, index) => (
                          <div key={type.name} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-1`} style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                            <span className="text-xs text-[#003b3f]">{type.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Weekly Trend</CardTitle>
                      <LineChartIcon className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyNotificationData}>
                            <Bar dataKey="count" fill="#006871" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] w-full">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`flex items-center justify-between p-4 ${notification.read ? 'opacity-50' : ''} border-b last:border-b-0`}>
                          <div className="flex items-center space-x-4">
                            {notification.type === 'alert' && <AlertTriangle className="h-6 w-6 text-red-500" />}
                            {notification.type === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
                            {notification.type === 'info' && <Info className="h-6 w-6 text-blue-500" />}
                            <div>
                              <p className="font-medium text-[#006871]">{notification.title}</p>
                              <p className="text-sm text-[#003b3f]">{notification.message}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)} className="text-[#006871] border-[#006871]">
                                Mark as Read
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)} className="text-[#006871]">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'activityLog' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Total Activities</CardTitle>
                      <Activity className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">{activityLogData.length}</div>
                      <p className="text-xs text-[#003b3f]">
                        In the last 24 hours
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Activity Types</CardTitle>
                      <Filter className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={activityTypeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={40}
                              fill="#006871"
                              dataKey="value"
                            >
                              {activityTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center space-x-2">
                        {activityTypeData.map((type, index) => (
                          <div key={type.name} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-1`} style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                            <span className="text-xs text-[#003b3f]">{type.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Daily Activity Trend</CardTitle>
                      <LineChartIcon className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dailyActivityData}>
                            <Bar dataKey="count" fill="#006871" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] w-full">
                      {activityLogData.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                          <div className="flex items-center space-x-4">
                            {activity.type === 'user' && <User className="h-6 w-6 text-[#006871]" />}
                            {activity.type === 'report' && <FileBarChart className="h-6 w-6 text-[#006871]" />}
                            {activity.type === 'data' && <Database className="h-6 w-6 text-[#006871]" />}
                            {activity.type === 'alert' && <AlertTriangle className="h-6 w-6 text-[#006871]" />}
                            <div>
                              <p className="font-medium text-[#006871]">{activity.action}</p>
                              <p className="text-sm text-[#003b3f]">By {activity.user}</p>
                              <p className="text-xs text-gray-400">{activity.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'suppliers' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Total Suppliers</CardTitle>
                      <Truck className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">{supplierData.length}</div>
                      <p className="text-xs text-[#003b3f]">
                        Active clean cooking solution providers
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Average Performance</CardTitle>
                      <LineChartIcon className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">
                        {(supplierData.reduce((sum, supplier) => sum + supplier.performance, 0) / supplierData.length).toFixed(1)}%
                      </div>
                      <p className="text-xs text-[#003b3f]">
                        Based on delivery time, quality, and customer feedback
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Total Inventory</CardTitle>
                      <Database className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-[#006871]">
                        {supplierData.reduce((sum, supplier) => sum + supplier.inventory, 0).toLocaleString()}
                      </div>
                      <p className="text-xs text-[#003b3f]">
                        Units of clean cooking solutions available
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Supplier Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={supplierPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="performance" fill="#006871">
                          {supplierPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#006871]">Supplier List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#006871]">Supplier Name</TableHead>
                          <TableHead className="text-[#006871]">Product</TableHead>
                          <TableHead className="text-[#006871]">Inventory</TableHead>
                          <TableHead className="text-[#006871]">Last Delivery</TableHead>
                          <TableHead className="text-[#006871]">Performance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supplierData.map((supplier) => (
                          <TableRow key={supplier.id}>
                            <TableCell className="text-[#003b3f]">{supplier.name}</TableCell>
                            <TableCell className="text-[#003b3f]">{supplier.product}</TableCell>
                            <TableCell className="text-[#003b3f]">{supplier.inventory.toLocaleString()}</TableCell>
                            <TableCell className="text-[#003b3f]">{supplier.lastDelivery}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded ${supplier.performance >= 90 ? 'bg-green-100 text-green-800' : supplier.performance >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {supplier.performance}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Notification Settings</CardTitle>
                      <Bell className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={settings.notifications}
                          onCheckedChange={(checked) => updateSetting('notifications', checked)}
                        />
                        <span className="text-[#003b3f]">Enable Notifications</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Dark Mode</CardTitle>
                      <Moon className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={isDarkMode}
                          onCheckedChange={setIsDarkMode}
                        />
                        <span className="text-[#003b3f]">Enable Dark Mode</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Data Refresh Rate</CardTitle>
                      <Clock className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#003b3f]">Refresh every {settings.dataRefreshRate} minutes</span>
                        </div>
                        <Slider
                          value={[settings.dataRefreshRate]}
                          onValueChange={(value) => updateSetting('dataRefreshRate', value[0])}
                          max={30}
                          min={1}
                          step={1}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Language</CardTitle>
                      <Globe className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                        <SelectTrigger className="w-full bg-[#c7e5d0] text-[#006871]">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-[#006871]">Data Privacy</CardTitle>
                      <Shield className="h-4 w-4 text-[#006871]" />
                    </CardHeader>
                    <CardContent>
                      <Select value={settings.dataPrivacy} onValueChange={(value) => updateSetting('dataPrivacy', value)}>
                        <SelectTrigger className="w-full bg-[#c7e5d0] text-[#006871]">
                          <SelectValue placeholder="Select Privacy Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#006871]">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-4">
                      <Button onClick={() => setIsAddUserModalOpen(true)} className="bg-[#006871] text-white hover:bg-[#003b3f]">
                        <Plus className="mr-2 h-4 w-4" /> Add User
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#006871]">Name</TableHead>
                          <TableHead className="text-[#006871]">Email</TableHead>
                          <TableHead className="text-[#006871]">Role</TableHead>
                          <TableHead className="text-[#006871]">Last Active</TableHead>
                          <TableHead className="text-[#006871]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="text-[#003b3f]">{user.name}</TableCell>
                            <TableCell className="text-[#003b3f]">{user.email}</TableCell>
                            <TableCell className="text-[#003b3f]">{user.role}</TableCell>
                            <TableCell className="text-[#003b3f]">{user.lastActive}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="text-[#006871]">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#006871]" onClick={() => deleteUser(user.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Enter the details of the new user below.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Analyst">Analyst</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setIsAddUserModalOpen(false)} variant="outline">Cancel</Button>
                      <Button onClick={addUser} className="bg-[#006871] text-white hover:bg-[#003b3f]">Add User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}