"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { signOut } from "next-auth/react";
import { FaSearch, FaEnvelope, FaBell, FaUser, FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { data: session } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const notificationPanel = useRef<OverlayPanel>(null);
    const profilePanel = useRef<OverlayPanel>(null);
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

    const NotificationItem = ({ notification }: { notification: any }) => (
        <div className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50' : ''}`}>
            <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'info' ? 'bg-blue-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-green-500'
                }`} />
                <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-800">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400 mt-1">{notification.time}</span>
                </div>
                {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
            </div>
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            
            <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm border-b border-gray-200 sticky top-0 z-40">
                {/* SEARCH BAR */}
                <div className="hidden md:flex items-center space-x-2 text-gray-600 text-sm bg-gray-50 rounded-full px-4 py-2 flex-grow max-w-md">
                    <FaSearch className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students, teachers, classes..."
                        className="bg-transparent outline-none w-full placeholder-gray-400 py-1"
                    />
                </div>

                {/* Mobile Search Button */}
                <div className="md:hidden">
                    <Button
                        icon={<FaSearch />}
                        className="p-button-text p-button-rounded"
                        aria-label="Search"
                    />
                </div>

                {/* ICONS & USER */}
                <div className="flex items-center space-x-2 lg:space-x-4">
                    {/* Messages */}
                    <Button
                        icon={<FaEnvelope />}
                        className="p-button-text p-button-rounded relative"
                        aria-label="Messages"
                    />

                    {/* Notifications */}
                    <div className="relative">
                        <Button
                            icon={<FaBell />}
                            className="p-button-text p-button-rounded"
                            onClick={(e) => notificationPanel.current?.toggle(e)}
                            aria-label="Notifications"
                        />
                        {unreadCount > 0 && (
                            <Badge 
                                value={unreadCount} 
                                severity="danger" 
                                className="absolute -top-1 -right-1"
                            />
                        )}
                        
                        <OverlayPanel 
                            ref={notificationPanel} 
                            className="w-80"
                            showCloseIcon={false}
                        >
                            <div className="p-0">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    <Button
                                        label="Mark all read"
                                        className="p-button-text p-button-sm"
                                    />
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <NotificationItem 
                                            key={notification.id} 
                                            notification={notification} 
                                        />
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-200 text-center">
                                    <Button
                                        label="View All Notifications"
                                        className="p-button-text p-button-sm"
                                    />
                                </div>
                            </div>
                        </OverlayPanel>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-2 lg:gap-3">
                        {/* User Info - Hidden on mobile */}
                        <div className="hidden lg:flex flex-col text-right">
                            <span className="text-sm font-medium text-gray-800 truncate max-w-32">
                                {userName}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">
                                {role}
                            </span>
                        </div>

                        {/* Profile Avatar */}
                        <div className="relative">
                            <Avatar
                                icon={<FaUserCircle />}
                                className="cursor-pointer bg-blue-500 text-white"
                                shape="circle"
                                size="normal"
                                onClick={(e) => profilePanel.current?.toggle(e)}
                            />
                            
                            <OverlayPanel 
                                ref={profilePanel} 
                                className="w-64"
                                showCloseIcon={false}
                            >
                                <div className="p-0">
                                    {/* Profile Header */}
                                    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                icon={<FaUserCircle />}
                                                className="bg-white/20"
                                                shape="circle"
                                                size="large"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{userName}</h4>
                                                <p className="text-sm opacity-90">{userEmail}</p>
                                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
                                                    {role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Menu */}
                                    <div className="p-2">
                                        <Button
                                            icon={<FaUser />}
                                            label="My Profile"
                                            className="p-button-text w-full justify-start"
                                        />
                                        <Button
                                            icon={<FaCog />}
                                            label="Settings"
                                            className="p-button-text w-full justify-start"
                                        />
                                        
                                        <Divider className="my-2" />
                                        
                                        <Button
                                            icon={<FaSignOutAlt />}
                                            label={isLoggingOut ? "Signing out..." : "Sign Out"}
                                            className="p-button-text w-full justify-start text-red-600 hover:bg-red-50"
                                            onClick={handleLogout}
                                            loading={isLoggingOut}
                                            disabled={isLoggingOut}
                                        />
                                    </div>
                                </div>
                            </OverlayPanel>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;