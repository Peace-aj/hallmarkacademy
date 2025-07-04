"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputSwitch } from "primereact/inputswitch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Shield, Key, Smartphone, Clock, MapPin } from "lucide-react";

const SecurityPage = () => {
    const { data: session } = useSession();
    const toast = useRef<Toast>(null);

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);

    // Mock login sessions data
    const loginSessions = [
        {
            id: 1,
            device: 'Chrome on Windows',
            location: 'New York, US',
            ip: '192.168.1.1',
            lastActive: '2 minutes ago',
            current: true
        },
        {
            id: 2,
            device: 'Safari on iPhone',
            location: 'New York, US',
            ip: '192.168.1.2',
            lastActive: '1 hour ago',
            current: false
        },
        {
            id: 3,
            device: 'Firefox on Mac',
            location: 'Los Angeles, US',
            ip: '192.168.1.3',
            lastActive: '2 days ago',
            current: false
        }
    ];

    const handlePasswordChange = () => {
        if (passwords.new !== passwords.confirm) {
            toast.current?.show({
                severity: 'error',
                summary: 'Password Mismatch',
                detail: 'New passwords do not match.',
                life: 3000
            });
            return;
        }

        if (passwords.new.length < 8) {
            toast.current?.show({
                severity: 'error',
                summary: 'Weak Password',
                detail: 'Password must be at least 8 characters long.',
                life: 3000
            });
            return;
        }

        // Here you would typically call your API
        toast.current?.show({
            severity: 'success',
            summary: 'Password Updated',
            detail: 'Your password has been changed successfully.',
            life: 3000
        });

        setPasswords({ current: '', new: '', confirm: '' });
    };

    const handleTerminateSession = (sessionId: number) => {
        toast.current?.show({
            severity: 'info',
            summary: 'Session Terminated',
            detail: 'The selected session has been terminated.',
            life: 3000
        });
    };

    const deviceTemplate = (rowData: any) => (
        <div className="flex items-center gap-3">
            <Smartphone size={16} className="text-gray-500" />
            <div>
                <div className="font-medium">{rowData.device}</div>
                {rowData.current && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Current Session
                    </span>
                )}
            </div>
        </div>
    );

    const locationTemplate = (rowData: any) => (
        <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-500" />
            <span>{rowData.location}</span>
        </div>
    );

    const lastActiveTemplate = (rowData: any) => (
        <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-500" />
            <span>{rowData.lastActive}</span>
        </div>
    );

    const actionTemplate = (rowData: any) => (
        !rowData.current && (
            <Button
                label="Terminate"
                className="p-button-text p-button-sm text-red-600"
                onClick={() => handleTerminateSession(rowData.id)}
            />
        )
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Toast ref={toast} />
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Shield className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Security</h1>
                    <p className="text-gray-600">Manage your account security settings</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Change Password */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Key className="text-blue-600" size={20} />
                        <h3 className="text-lg font-semibold">Change Password</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <Password
                                value={passwords.current}
                                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                placeholder="Enter current password"
                                className="w-full"
                                feedback={false}
                                toggleMask
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <Password
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                placeholder="Enter new password"
                                className="w-full"
                                toggleMask
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <Password
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                placeholder="Confirm new password"
                                className="w-full"
                                feedback={false}
                                toggleMask
                            />
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <Button
                            label="Update Password"
                            onClick={handlePasswordChange}
                            disabled={!passwords.current || !passwords.new || !passwords.confirm}
                        />
                    </div>
                </Card>

                {/* Two-Factor Authentication */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Smartphone className="text-green-600" size={20} />
                        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium">Enable 2FA</h4>
                                <p className="text-sm text-gray-600">
                                    Add an extra layer of security to your account
                                </p>
                            </div>
                            <InputSwitch
                                checked={twoFactorEnabled}
                                onChange={(e) => setTwoFactorEnabled(e.value)}
                            />
                        </div>
                        
                        {twoFactorEnabled && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-800 mb-3">
                                    Scan this QR code with your authenticator app:
                                </p>
                                <div className="w-32 h-32 bg-white border-2 border-blue-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400">QR Code</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Login Alerts */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-purple-600" size={20} />
                        <h3 className="text-lg font-semibold">Login Alerts</h3>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Email Login Notifications</h4>
                            <p className="text-sm text-gray-600">
                                Get notified when someone signs in to your account
                            </p>
                        </div>
                        <InputSwitch
                            checked={loginAlerts}
                            onChange={(e) => setLoginAlerts(e.value)}
                        />
                    </div>
                </Card>

                {/* Active Sessions */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="text-orange-600" size={20} />
                        <h3 className="text-lg font-semibold">Active Sessions</h3>
                    </div>
                    
                    <DataTable value={loginSessions} className="p-datatable-sm">
                        <Column 
                            field="device" 
                            header="Device" 
                            body={deviceTemplate}
                        />
                        <Column 
                            field="location" 
                            header="Location" 
                            body={locationTemplate}
                        />
                        <Column 
                            field="ip" 
                            header="IP Address"
                        />
                        <Column 
                            field="lastActive" 
                            header="Last Active" 
                            body={lastActiveTemplate}
                        />
                        <Column 
                            header="Actions" 
                            body={actionTemplate}
                        />
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default SecurityPage;