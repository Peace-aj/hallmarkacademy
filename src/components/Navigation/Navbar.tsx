"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { signOut } from "next-auth/react";
import { 
    Search, 
    Mail, 
    Bell, 
    User, 
    LogOut, 
    Settings, 
    UserCircle,
    Shield,
    HelpCircle,
    Palette,
    Key,
    Database,
    Menu as MenuIcon,
    ChevronDown
} from 'lucide-react';

interface NavbarProps {
    onMobileMenuToggle?: () => void;
}

const Navbar = ({ onMobileMenuToggle }: NavbarProps) => {
    const { data: session } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    
    const toast = useRef<Toast>(null);

    const role = session?.user?.role || 'Guest';
    const userName = session?.user?.name || 'User';
    const userEmail = session?.user?.email || '';

    // Mock notifications data
    const notifications = [
        {
            id: 1,
            title: "New Student Registration",
            message: "5 new students have registered today",
            time: "2 hours ago",
            type: "info",
            unread: true
        },
        {
            id: 2,
            title: "System Update",
            message: "System maintenance scheduled for tonight",
            time: "4 hours ago",
            type: "warning",
            unread: true
        },
        {
            id: 3,
            title: "Payment Received",
            message: "School fees payment from John Doe",
            time: "1 day ago",
            type: "success",
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleLogout = () => {
        confirmDialog({
            message: 'Are you sure you want to sign out?',
            header: 'Confirm Sign Out',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                setIsLoggingOut(true);
                try {
                    await signOut({ callbackUrl: "/" });
                } catch (error) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to sign out. Please try again.',
                        life: 3000
                    });
                } finally {
                    setIsLoggingOut(false);
                }
            }
        });
    };

    const settingsItems = [
        { icon: User, label: 'My Profile', href: '/dashboard/profile' },
        { icon: Settings, label: 'Preferences', href: '/dashboard/settings/preferences' },
        { icon: Shield, label: 'Security', href: '/dashboard/settings/security' },
        { icon: Palette, label: 'Appearance', href: '/dashboard/settings/appearance' },
        { icon: Database, label: 'Privacy', href: '/dashboard/settings/privacy' },
        ...(role === 'super' || role === 'admin' ? [
            { icon: Key, label: 'API Keys', href: '/dashboard/settings/api' }
        ] : []),
        { icon: HelpCircle, label: 'Help & Support', href: '/dashboard/help' },
    ];

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            
            <header className="flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 lg:px-6 py-3 shadow-sm border-b border-gray-200 sticky top-0 z-40">
                {/* Mobile Menu Button & Search */}
                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMobileMenuToggle}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <MenuIcon size={20} />
                    </button>

                    {/* Search Bar */}
                    <div className={`
                        flex items-center space-x-3 text-gray-600 text-sm bg-gray-50 rounded-full px-4 py-2.5 
                        transition-all duration-300 border border-gray-200 hover:border-gray-300 focus-within:border-blue-400 focus-within:bg-white
                        ${searchExpanded ? 'flex-1' : 'flex-1 max-w-md'}
                    `}>
                        <Search size={18} className="text-gray-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search students, teachers, classes..."
                            className="bg-transparent outline-none w-full placeholder-gray-400 py-1 min-w-0"
                            onFocus={() => setSearchExpanded(true)}
                            onBlur={() => setSearchExpanded(false)}
                        />
                        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Actions & User */}
                <div className="flex items-center space-x-2 lg:space-x-3 ml-4">
                    {/* Messages */}
                    <div className="relative">
                        <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                            <Mail size={20} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button 
                            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setNotificationOpen(!notificationOpen)}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        
                        {/* Notifications Dropdown */}
                        {notificationOpen && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                                        <button className="text-sm text-blue-600 hover:text-blue-700">
                                            Mark all read
                                        </button>
                                    </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${notification.unread ? 'bg-blue-50' : ''}`}>
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                    notification.type === 'info' ? 'bg-blue-500' :
                                                    notification.type === 'warning' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`} />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm text-gray-800 truncate">{notification.title}</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                                    <span className="text-xs text-gray-400 mt-1">{notification.time}</span>
                                                </div>
                                                {notification.unread && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200 text-center bg-gray-50">
                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        {/* User Info - Hidden on mobile */}
                        <div className="hidden lg:flex flex-col text-right">
                            <span className="text-sm font-semibold text-gray-800 truncate max-w-32">
                                {userName}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">
                                {role}
                            </span>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center">
                                    <UserCircle size={20} />
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>
                            
                            {/* Profile Dropdown Menu */}
                            {profileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                    {/* Profile Header */}
                                    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <UserCircle size={24} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-semibold text-lg truncate">{userName}</h4>
                                                <p className="text-sm opacity-90 truncate">{userEmail}</p>
                                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize mt-2 inline-block">
                                                    {role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Settings Menu */}
                                    <div className="p-2">
                                        {settingsItems.map((item, index) => (
                                            <button
                                                key={index}
                                                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                                onClick={() => window.location.href = item.href}
                                            >
                                                <item.icon size={18} className="text-gray-600" />
                                                <span className="text-gray-700">{item.label}</span>
                                            </button>
                                        ))}
                                        
                                        <div className="border-t border-gray-200 my-2" />
                                        
                                        <button
                                            className="w-full flex items-center gap-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                        >
                                            <LogOut size={18} />
                                            <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Click outside to close dropdowns */}
            {(notificationOpen || profileOpen) && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setNotificationOpen(false);
                        setProfileOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default Navbar;