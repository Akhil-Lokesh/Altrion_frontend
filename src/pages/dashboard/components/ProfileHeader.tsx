import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, Input } from '../../../components/ui';
import { useAuthStore } from '../../../store';
import { formatDate } from '../../../utils';

const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(30, 'Display name must be less than 30 characters')
    .optional()
    .or(z.literal('')),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function ProfileHeader() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      displayName: user?.displayName || '',
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEditClick = () => {
    reset({
      name: user?.name || '',
      displayName: user?.displayName || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = (data: EditProfileFormData) => {
    updateUser({
      name: data.name,
      displayName: data.displayName || undefined,
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Card variant="bordered" className="border-altrion-500/20">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-altrion-500/20 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-altrion-400">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary">Edit Profile</h3>
                <p className="text-sm text-text-secondary">Update your account information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Display Name (optional)"
                {...register('displayName')}
                error={errors.displayName?.message}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                <Check size={16} />
                Save Changes
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-6"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-altrion-500/20 flex items-center justify-center flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-altrion-400">
                  {getInitials(user.name)}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-2xl font-bold text-text-primary truncate">
                {user.displayName || user.name}
              </h2>
              <p className="text-text-secondary truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-text-muted text-sm">
                <Calendar size={14} />
                <span>Member since {formatDate(new Date(user.createdAt))}</span>
              </div>
            </div>

            {/* Edit Button */}
            <Button variant="secondary" size="sm" onClick={handleEditClick}>
              <Edit2 size={16} />
              Edit Profile
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
